import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Themes } from "../assets/Themes";
import { Context } from "../context/themContext";
const themes = ({ navigation }) => {
  const { setTheme } = useContext(Context);
  const stylo = () => {
    const themos = [];
    for (const key in Themes) {
      themos.push({
        id: key,
        image: Themes[key].Image,
        colors: Themes[key].Colors,
      });
    }
    return themos;
  };

  const setThemHandeler = (Image, colors) => {
    const theTheme = {
      Image,
      Colors: colors,
    };

    setTheme(theTheme);
    navigation.popToTop();
  };

  return (
    <View>
      <FlatList
        data={stylo()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setThemHandeler(item.image, item.colors)}
          >
            <View style={styles.card}>
              <Image style={styles.image} source={item.image} />
              <Text style={styles.name}>{item.id}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default themes;

const styles = StyleSheet.create({
  card: {
    margin: 20,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  image: {
    height: 150,
    width: "100%",
  },
  name: {
    textTransform: "uppercase",
    fontSize: 18,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
});
