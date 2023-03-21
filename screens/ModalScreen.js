import { Text, View } from "react-native";
import React, { Component, useState } from "react";
import { Image } from "react-native";
import { getAuth } from "firebase/auth";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ModalScreen({ navigation }) {
  const auth = getAuth();

  const user = auth.currentUser;
  const userEmail = user.email;

  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const [name, setName] = useState(null);

  const incompleteForm = !image || !job || !age || !name;

  const updateUserprofile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: name,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View className="flex-1 items-center pt-1">
      <Image
        className="h-20 w-full"
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />

      <Text className="text-xl text-gray-500 p-2 font-bold">
        Welcome {userEmail}
      </Text>

      <Text className="text-center p-4 font-bold text-red-400">
        Step 1: The Profile Pic
      </Text>

      <TextInput
        value={image}
        onChangeText={(text) => setImage(text)}
        className="text-center text-xl pb-2"
        placeholder="Enter a Profile Pic URL"
      />

      <Text className="text-center p-4 font-bold text-red-400">
        Step 2: The Job
      </Text>

      <TextInput
        value={job}
        onChangeText={(text) => setJob(text)}
        className="text-center text-xl pb-2"
        placeholder="Enter your occupation"
      />

      <Text className="text-center p-4 font-bold text-red-400">
        Step 3: The Age
      </Text>

      <TextInput
        value={age}
        onChangeText={(text) => setAge(text)}
        className="text-center text-xl pb-2"
        placeholder="Enter your Age"
        keyboardType="numeric"
        maxLength={2}
      />

      <Text className="text-center p-4 font-bold text-red-400">
        Step 4: The Name
      </Text>

      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        className="text-center text-xl pb-2"
        placeholder="Enter the name you want to be seen as"
      />

      <TouchableOpacity
        className={
          incompleteForm
            ? "w-64 p-3 rounded-xl absolute bottom-10 bg-gray-400"
            : "w-64 p-3 rounded-xl absolute bottom-10 bg-red-400"
        }
        disabled={incompleteForm}
        onPress={updateUserprofile}
      >
        <Text className="text-center text-white text-xl">Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
