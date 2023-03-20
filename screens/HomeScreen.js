import { TouchableOpacity, View, Text, Button, StyleSheet } from "react-native";
import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, database } from "../firebase";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import colors from "../colors";
import { SafeAreaView } from "react-native";

import { Image } from "react-native";
import Swiper from "react-native-deck-swiper";

const DUMMY_DATA = [
  {
    firstName: "Jason",
    lastName: "Wang",
    job: "Software Developer",
    photoURL:
      "https://s1.narvii.com/image/ntmadk6v5fotxkw2hf7xy7azdf2yygo2_hq.jpg",
    age: 22,
    id: 1,
  },
  {
    firstName: "Jason",
    lastName: "Wang",
    job: "Software Developer",
    photoURL:
      "https://ih1.redbubble.net/image.939692630.5711/st,small,507x507-pad,600x600,f8f8f8.jpg",
    age: 22,
    id: 2,
  },
  {
    firstName: "Jason",
    lastName: "Wang",
    job: "Software Developer",
    photoURL:
      "https://i.pinimg.com/736x/bf/57/6a/bf576a8b45668b408d04c5729c528c4b--potato-kawaii.jpg",
    age: 22,
    id: 3,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  const swipeRef = useRef(null);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between px-5">
        <TouchableOpacity onPress={onSignOut}>
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../logo.png")} className="h-14 w-14" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <View className="flex-1 -mt-6">
        <Swiper
          ref={swipeRef}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          onSwipedLeft={() => {
            console.log("Swipe PASS");
          }}
          onSwipedRight={() => {
            console.log("Swipe MATCH");
          }}
          backgroundColor={"#4FD0E9"}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          animateCardOpacity
          containerStyle={{ backgroundColor: "transparent" }}
          cards={DUMMY_DATA}
          renderCard={(card) => (
            <View key={card.id} className="relative bg-white h-3/4 rounded-xl">
              <Image
                className="absolute h-full w-full rounded-xl"
                source={{
                  uri: card.photoURL,
                }}
              />
              <View
                className="absolute bottom-0 bg-white w-full flex-row 
                justify-between items-center h-20 px-6 py-2 rounded-b-xl"
                style={styles.cardShadow}
              >
                <View>
                  <Text className="text-xl font-bold">
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text>{card.job}</Text>
                </View>
                <Text className="text-2xl font-bold">{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View className="flex flex-row justify-evenly">
        <TouchableOpacity
          className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
