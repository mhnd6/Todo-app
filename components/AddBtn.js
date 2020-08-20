import React, { useState, useContext } from "react";
import { StyleSheet, View, Modal } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Context as themeContext } from "../context/themContext";
import EditBox from "../components/EditBox";
import { Context } from "../context/listContext";
const AddBtn = ({ id }) => {
  const [showAddBox, setShowAddBox] = useState(false);
  const { addTodo, loadItems } = useContext(Context);
  const { state } = useContext(themeContext);
  const Colors = state.Colors;
  const addTolist = (text, id) => {
    console.log(id);
    addTodo(text, id);
    loadItems();
    setShowAddBox(false);
  };

  return (
    <View>
      <Modal visible={showAddBox} transparent={true} animationType="slide">
        <EditBox
          onPress={(text) => addTolist(text, id)}
          closeModal={() => setShowAddBox(false)}
        />
      </Modal>
      <Button
        icon={<Ionicons name="ios-add-circle-outline" size={30} color="#fff" />}
        onPress={() => setShowAddBox(true)}
        buttonStyle={[
          styles.btn,
          { backgroundColor: Colors.transPrimary, borderColor: Colors.primary },
        ]}
      />
    </View>
  );
};

export default AddBtn;

const styles = StyleSheet.create({
  btn: {
    width: 300,

    borderStyle: "dashed",
    borderWidth: 2,
    borderRadius: 50,
  },
});
