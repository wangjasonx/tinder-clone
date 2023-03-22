import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const MatchedScreen = ({ route, navigation }) => {
  const { loggedInProfile, userSwiped } = route.params;
  return (
    <View className="h-full bg-red-500 pt-20" style={{ opacity: 0.89 }}>
      <View className="justify-center px-10 pt-20">
        <Image
          className="h-20 w-full"
          source={{ uri: "https://links.papareact.com/mg9" }}
        />
      </View>

      <Text className="text-white text-center mt-5">
        You and {userSwiped.displayName} have liked each other.
      </Text>

      <View className="flex-row justify-evenly mt-5">
        <Image
          className="h-32 w-32 rounded-full"
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image
          className="h-32 w-32 rounded-full"
          source={{ uri: userSwiped.photoURL }}
        />
      </View>

      <TouchableOpacity
        className="bg-white m-5 px-10 py-8 rounded-full mt-20"
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text className="text-center">Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;
