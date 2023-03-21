import { TouchableOpacity, View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { auth, database, db } from "../firebase";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import colors from "../colors";
import { SafeAreaView } from "react-native";

import { Image } from "react-native";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  Query,
  where,
} from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  // const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  const swipeRef = useRef(null);
  const [profiles, setProfiles] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate("Modal");
      }
    });

    return unsubscribe();
  });

  useEffect(() => {
    let unsubscribe;

    const fetchCards = async () => {
      const passes = getDocs(collection(db, "users", user.uid, "passes")).then(
        (snapshot) => snapshot.docs.map((doc) => doc.id)
      );

      const swipes = getDocs(collection(db, "users", user.uid, "swipes")).then(
        (snapshot) => snapshot.docs.map((doc) => doc.id)
      );

      const passedUserIds = passes.length > 0 ? passes : ["test"];

      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      unsubscribe = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsubscribe;
  }, []);

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You swiped PASS on ${userSwiped.displayName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(
      `You swiped MATCH on ${userSwiped.displayName} (${userSwiped.job})`
    );

    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
  };

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
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
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
          onSwipedLeft={(cardIndex) => {
            console.log("Swipe PASS");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swipe MATCH");
            swipeRight(cardIndex);
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
          cards={profiles}
          renderCard={(card) =>
            card ? (
              <View
                key={card.id}
                className="relative bg-white h-3/4 rounded-xl"
              >
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
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text className="text-2xl font-bold">{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                className="relative bg-white h-3/4 rounded-xl justify-center items-center"
                style={styles.cardShadow}
              >
                <Text className="font-bold pb-5">No more profiles</Text>

                <Image
                  className="h-100 w-full"
                  height={100}
                  width={100}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
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
