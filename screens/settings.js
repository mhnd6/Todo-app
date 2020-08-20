import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const settings = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <TouchableOpacity onPress={() => navigation.navigate("Themes")}>
        <View style={styles.box}>
          <MaterialIcons name="style" size={24} color="#fff" />
          <Text style={styles.label}>Theme</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default settings;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 20,
  },
  box: {
    backgroundColor: "#29293d",
    padding: 15,
    borderRadius: 5,
    flexDirection: "row",
  },
});
