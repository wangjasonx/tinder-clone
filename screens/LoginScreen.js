import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView,
TouchableHighlight, StatusBar, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {

  // const { promptAsync, userInfo, request } = useAuth();
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const onHandleLogin = () => {
      if (email !== "" && password !== "") {
          signInWithEmailAndPassword(auth, email, password)
              .then(() => console.log("Login Success!"))
              .catch((err) => Alert.alert("Login failed", err.message));
      }
  };

  return (
    <View style={styles.container}>
            <View style={styles.whiteSheet} />
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Login</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoFocus={false}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType='password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableHighlight style={styles.button} onPress={onHandleLogin}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize:18}}>Log In</Text>
                </TouchableHighlight>
                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                    <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
                    <TouchableHighlight onPress={() => navigation.navigate("SignUp")}>
                        <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}> Sign Up</Text>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
        </View>
    // <View style={styles.container}>
    //   {userInfo === null ? (
    //     <Button
    //       title="Sign in with Google"
    //       disabled={!request}
    //       onPress={() => {
    //         promptAsync();
    //       }}
    //     />
    //   ) : (
    //     <Text style={styles.text}>{userInfo.name}</Text>
    //   )}
    // </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});