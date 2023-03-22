import { View, Text, StyleSheet } from "react-native";
import React from "react";

const SenderMessage = ({ message }) => {
  return (
    <View
      className="bg-purple-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2"
      style={styles.messageExtra}
    >
      <Text className="text-white">{message.message}</Text>
    </View>
  );
};

export default SenderMessage;

const styles = StyleSheet.create({
  messageExtra: {
    alignSelf: "flex-start",
    marginLeft: "auto",
  },
});
