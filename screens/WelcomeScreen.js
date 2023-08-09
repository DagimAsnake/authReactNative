import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const authCtx = useContext(AuthContext)
  const [msg, setMsg] = useState("")

  const token = authCtx.token

  useEffect(() => {
    axios.get("https://react-native-auth-3b632-default-rtdb.firebaseio.com/message.json?auth=" + token).then((response) => {
      setMsg(response.data)
    })
  }, [token])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{msg}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});