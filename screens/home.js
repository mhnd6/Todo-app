import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/TodoContext";
import { Context as listContext } from "../context/listContext";
import { Context as themeContext } from "../context/themContext";
import Todos from "../components/Todos";
import { MaterialIcons } from "@expo/vector-icons";
import Title from "../components/Title";
import Footer from "../components/Footer";
import AddBtn from "../components/AddBtn";
import { Themes } from "../assets/Themes";
const home = ({ navigation }) => {
  const { state, addTodos, loadTodos } = useContext(Context);
  const { loadItems } = useContext(listContext);
  const { getTheme } = useContext(themeContext);

  const witdh = Dimensions.get("window").width;

  const takeTheme = () => {
    const { state } = useContext(themeContext);
    return state;
  };
  const defaultTheme = takeTheme();
  console.log(defaultTheme);
  const Colors = defaultTheme.Colors;

  const footer = () => {
    return <Footer addTodo={addTodos} />;
  };

  useEffect(() => {
    loadTodos();
    loadItems();
    getTheme();
  }, []);

  if (state.length === 0) {
    return (
      <ImageBackground
        style={styles.screen}
        source={
          defaultTheme.Image === undefined
            ? require("../images/ice.jpg")
            : defaultTheme.Image
        }
      >
        <Footer addTodo={addTodos} />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      style={styles.screen}
      source={
        defaultTheme.Image === undefined
          ? require("../images/ice.jpg")
          : defaultTheme.Image
      }
    >
      <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <MaterialIcons
            name="settings"
            size={35}
            color={Colors.secondary}
            style={styles.sIcon}
          />
        </TouchableOpacity>
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={footer}
          pagingEnabled
          horizontal
          data={state}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={[styles.list, { width: witdh }]}>
                <Title title={item.title} id={item.id} />
                <AddBtn id={item.id} />
                <View style={{ height: 500, marginTop: 15 }}>
                  <Todos id={item.id} />
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sIcon: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 20,
  },
  list: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
