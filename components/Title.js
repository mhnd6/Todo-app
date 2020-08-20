import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import EditBox from "../components/EditBox";
import { Context } from "../context/TodoContext";
import { Context as listCon } from "../context/listContext";
import { Context as themeContext } from "../context/themContext";

const Title = ({ title, id }) => {
  const { editTodoss, deleteTodoss } = useContext(Context);
  const { deleteList } = useContext(listCon);
  const [newTitle, setNewTitle] = useState(title);
  const [shoBox, setShoBox] = useState(false);
  const { state } = useContext(themeContext);
  const Colors = state.Colors;

  const saveTitle = (newTitle) => {
    editTodoss(id, newTitle);
    setNewTitle(newTitle);
    setShoBox(false);
  };

  const deleteAlert = () => {
    Alert.alert("Warinnig !!", `Are you sure you want to delete ${newTitle}?`, [
      {
        text: "Yes",
        onPress: () => {
          deleteTodoss(id);
          deleteList(id);
        },
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.titleRow}>
      <Modal visible={shoBox} transparent={true} animationType="slide">
        <EditBox
          text={newTitle}
          onPress={(text) => saveTitle(text)}
          closeModal={() => setShoBox(false)}
        />
      </Modal>
      <TouchableOpacity onLongPress={deleteAlert}>
        <Text
          style={[
            styles.title,
            {
              color: Colors.secondary,
            },
          ]}
        >
          {newTitle}
        </Text>
      </TouchableOpacity>

      <View style={styles.icon}>
        <TouchableOpacity onPress={() => setShoBox(true)}>
          <FontAwesome5 name="pencil-alt" size={18} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 30,
  },
  titleRow: {
    flexDirection: "row",
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
  },
});
