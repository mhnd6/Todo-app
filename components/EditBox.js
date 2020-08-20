import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { Context as themeContext } from "../context/themContext";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";

const ReviewSchema = yup.object({
  title: yup.string().required("Sorry you can't add empty todo !!"),
});
const EditBox = ({ text, onPress, closeModal }) => {
  const [title, setTitle] = useState(text);
  const { state } = useContext(themeContext);
  const Colors = state.Colors;
  return (
    <View style={styles.box}>
      <View style={[styles.dialog, { backgroundColor: Colors.primary }]}>
        <TouchableOpacity onPress={closeModal}>
          <FontAwesome
            name="close"
            size={24}
            color="#fff"
            style={{ alignSelf: "flex-end" }}
          />
        </TouchableOpacity>
        <Formik
          initialValues={{ title: text }}
          onSubmit={(values) => {
            onPress(values.title);
          }}
          validationSchema={ReviewSchema}
        >
          {(props) => (
            <View>
              <TextInput
                style={styles.input}
                value={props.values.title}
                onChangeText={props.handleChange("title")}
                onSubmitEditing={props.handleSubmit}
                autoCapitalize="none"
                placeholder="Enter your todo"
              />
              <Text style={styles.err}>{props.errors.title}</Text>
              <Button
                title="Done"
                onPress={props.handleSubmit}
                buttonStyle={styles.btn}
                titleStyle={{ color: Colors.primary }}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default EditBox;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "rgba(0, 0, 0,0)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    padding: 15,
    borderRadius: 5,
    width: 300,
    borderColor: "#fff",
  },
  input: {
    fontSize: 30,
    marginBottom: 15,

    borderBottomWidth: 2,
    height: 80,
    color: "#fff",
    borderBottomColor: "#fff",
  },
  btn: {
    marginTop: 10,
    backgroundColor: "#fff",
  },
  err: {
    color: "#fff",
  },
});
