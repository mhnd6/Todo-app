import dataContext from "./dataContext";
const SET_THEME = "SET_THEME";
const GET_THEME = "GET_THEME";
import { AsyncStorage } from "react-native";

const ThemeReducer = (state, action) => {
  switch (action.type) {
    case SET_THEME:
      return action.theme;
    case GET_THEME:
      return action.theme;

    default:
      return;
  }
};
const setTheme = (dispatch) => async (theme) => {
  try {
    await AsyncStorage.setItem("theme", JSON.stringify(theme));
    dispatch({ type: SET_THEME, theme: theme });
    console.log("saved succssed");
  } catch (error) {
    console.log("saved faild");
  }
};
const getTheme = (dispatch) => async () => {
  try {
    const theme = await AsyncStorage.getItem("theme");
    if (theme === null) {
      return;
    } else {
      dispatch({ type: GET_THEME, theme: JSON.parse(theme) });
      console.log("get succssed");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const { Context, Provider } = dataContext(
  ThemeReducer,
  { setTheme, getTheme },
  {
    Colors: {
      primary: "#6a51ae",
      secondary: "#fff",
      transPrimary: "rgba(102, 102, 255, 0.5)",
      borderBtn: "rgb(102, 102, 255)",
    },
  }
);
