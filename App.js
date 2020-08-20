import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import home from "./screens/home";
import settings from "./screens/settings";
import themes from "./screens/themes";
import Test from "./Test";
import { Provider } from "./context/TodoContext";
import { Provider as ListProvider } from "./context/listContext";
import { Provider as ThemeProvider } from "./context/themContext";
import { init1, init2 } from "./helpers/db";
const MyStack = createStackNavigator();

init1()
  .then(() => {
    console.log("init1 success");
  })
  .catch((err) => {
    console.log("init1 faild");
    console.log(err);
  });
init2()
  .then(() => {
    console.log("init2 success");
  })
  .catch((err) => {
    console.log("init2 faild");
    console.log(err);
  });

const Naviagtor = () => {
  return (
    <ThemeProvider>
      <ListProvider>
        <Provider>
          <NavigationContainer>
            <MyStack.Navigator>
              <MyStack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={home}
              />
              <MyStack.Screen name="Settings" component={settings} />
              <MyStack.Screen name="Themes" component={themes} />
              <MyStack.Screen name="Test" component={Test} />
            </MyStack.Navigator>
          </NavigationContainer>
        </Provider>
      </ListProvider>
    </ThemeProvider>
  );
};

export default Naviagtor;
