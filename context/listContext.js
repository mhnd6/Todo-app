import dataContext from "./dataContext";
import {
  insertTodoItem,
  fetchTodoItem,
  deleteTodoList,
  deleteTodoItem,
  editTodoItem,
} from "../helpers/db";
const SET_LIST = "SET_LIST";
const DEL_LIST = "DEL_LIST";
const DEL_ITEM = "DEL_ITEM";
const EDIT_ITEM = "EDIT_ITEM";

const listReducer = (state, action) => {
  switch (action.type) {
    case SET_LIST:
      return action.data;
    case EDIT_ITEM:
      return state.map((item) =>
        item.id === action.data.id ? action.data : item
      );
    case DEL_LIST:
      return state.filter((todos) => todos.listId !== action.id);
    case DEL_ITEM:
      return state.filter((todos) => todos.listId !== action.id);
    default:
      return state;
  }
};

const addTodo = (dispatch) => {
  return async (title, listId) => {
    try {
      const dbresult = await insertTodoItem(title, false, listId);
      //   dispatch({
      //     type: ADD_Todo,
      //     data: { id: dbresult.insertId, title: "New" },
      //   });
    } catch (error) {
      console.log(error);
    }
  };
};
const loadItems = (dispatch) => {
  return async () => {
    try {
      const dbresult = await fetchTodoItem();
      dispatch({
        type: SET_LIST,
        data: dbresult.rows._array,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
const editItem = (dispatch) => {
  return async (id, title, value, listId) => {
    try {
      const dbresult = await editTodoItem(id, value);
      dispatch({
        type: EDIT_ITEM,
        data: { id: id, title: title, done: value, listId: listId },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
const deleteList = (dispatch) => {
  return async (id) => {
    try {
      const dbresult = await deleteTodoList(id);
      dispatch({
        type: DEL_LIST,
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
const deleteItem = (dispatch) => {
  return async (id) => {
    try {
      const dbresult = await deleteTodoItem(id);
      dispatch({
        type: DEL_ITEM,
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const { Context, Provider } = dataContext(
  listReducer,
  {
    addTodo,
    loadItems,
    deleteList,
    deleteItem,
    editItem,
  },
  []
);
