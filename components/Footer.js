import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Footer = ({ addTodo }) => {
  const witdh = Dimensions.get("window").width;
  return (
    <View style={[styles.footer, { width: witdh }]}>
      <TouchableOpacity onPress={addTodo}>
        <Ionicons
          name="ios-add-circle-outline"
          size={50}
          color="#fff"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    borderWidth: 4,
    paddingVertical: 260,
    paddingHorizontal: 100,
    borderColor: "#fff",
    borderRadius: 30,
    borderStyle: "dashed",
  },
});
