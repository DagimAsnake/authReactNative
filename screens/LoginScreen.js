import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import { loginUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const authCtx = useContext(AuthContext)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function loginHandler({email, password}){
    setIsAuthenticating(true)
    try{
      const token = await loginUser(email, password)
      authCtx.authenticated(token)
    } catch(error) {
      Alert.alert(
        "Authentication failed",
        "couldn't login user, please check your input and try again later"
      )
      setIsAuthenticating(false)
    }
  }

  if(isAuthenticating) {
    return <LoadingOverlay message={"Login you in....."} />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;