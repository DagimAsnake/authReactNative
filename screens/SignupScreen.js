import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const authCtx = useContext(AuthContext)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function signupHandler({email, password}){
    setIsAuthenticating(true)
    try{
     const token = await createUser(email, password)
     authCtx.authenticated(token)
    } catch(error) {
      Alert.alert(
        "Authentication failed",
        "couldn't creat user, please check your input and try again later"
      )
      setIsAuthenticating(false)
    }
  }

  if(isAuthenticating) {
    return <LoadingOverlay message={"Creating a user....."} />
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;