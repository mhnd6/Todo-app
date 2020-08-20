import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

const Test = () => {
  const Colors = ["red", "green", "blue"];
  const [color, setColor] = useState("");
  return (
    <View style={styles.box}>
      <FlatList
        horizontal
        data={Colors}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setColor(item)}
            style={{
              backgroundColor: item,
              width: 100,
              marginTop: 100,
              height: 100,
            }}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={{ marginBottom: 400, fontSize: 30 }}>{color}</Text>
    </View>
  );
};
export default Test;
const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
  },
});
