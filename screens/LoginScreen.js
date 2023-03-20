import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableHighlight,
  StatusBar,
  Alert,
  ImageBackground,
  Platform,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

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

  const image = { uri: "https://tinder.com/static/tinder.png" };

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <View style={styles.whiteSheet} />
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.backImage}
      ></ImageBackground>
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableHighlight style={styles.button} onPress={onHandleLogin}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            Log In
          </Text>
        </TouchableHighlight>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
            Don't have an account?{" "}
          </Text>
          <TouchableHighlight onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "#FF5864", fontWeight: "600", fontSize: 14 }}>
              {" "}
              Sign Up
            </Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FF5864",
    alignSelf: "center",
    zIndex: 1,
    bottom: 24,
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
    height: 380,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
    zIndex: -1,
  },
  whiteSheet: {
    width: "100%",
    height: "62%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 60,
    zIndex: 0,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
    top: 135,
  },
  button: {
    backgroundColor: "#FF5864",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
