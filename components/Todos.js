import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/listContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Context as themeContext } from "../context/themContext";
const todos = ({ id }) => {
  const { state, loadItems, deleteItem, editItem } = useContext(Context);
  const Colors = useContext(themeContext).state.Colors;

  const list = state.filter((item) => item.listId === id);

  const deletehandeler = (id) => {
    deleteItem(id);
    loadItems();
  };

  const EditHelper = (id, title, done, listId) => {
    let value;
    if (done === 0) {
      value = 1;
    } else {
      value = 0;
    }
    editItem(id, title, value, listId);
    loadItems();
  };

  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={(todo) => todo.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.list,
              {
                borderColor: Colors.primary,
                backgroundColor: Colors.transPrimary,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() =>
                EditHelper(item.id, item.title, item.done, item.listId)
              }
            >
              <Text
                style={[
                  styles.item,
                  {
                    textDecorationLine:
                      item.done !== 0 ? "line-through" : "none",

                    color: item.done !== 0 ? Colors.secondary : "#fff",
                  },
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deletehandeler(item.id)}>
              <MaterialCommunityIcons
                name="delete-circle"
                size={24}
                color="#fff"
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default todos;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    fontSize: 18,
    flex: 1,
    textDecorationLine: "line-through",
    marginRight: 60,
    width: 200,
  },
  titleClcik: {},
  list: {
    borderWidth: 1,
    margin: 6,
    padding: 8,
    width: 300,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
