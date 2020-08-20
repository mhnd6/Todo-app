import dataContext from "./dataContext";
import { insertTodos, fetchTodos, editTodos, deleteTodos } from "../helpers/db";
const ADD_Todos = "ADD_Todos";
const SET_TODOS = "SET_TODOS";
const EDIT_TODOS = "EDIT_TODOS";
const DEL_TODOS = "DEL_TODOS";

const TodoReducer = (state, action) => {
  switch (action.type) {
    case ADD_Todos:
      return [...state, action.data];
    case SET_TODOS:
      return action.data;
    case EDIT_TODOS:
      return state.map((todos) =>
        todos.id === action.data.id ? action.data : todos
      );
    case DEL_TODOS:
      return state.filter((todos) => todos.id !== action.id);
    default:
      return state;
  }
};

const addTodos = (dispatch) => {
  return async () => {
    try {
      const dbresult = await insertTodos("newTodo");
      dispatch({
        type: ADD_Todos,
        data: { id: dbresult.insertId, title: "New" },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
const loadTodos = (dispatch) => {
  return async () => {
    try {
      const dbresult = await fetchTodos();
      dispatch({
        type: SET_TODOS,
        data: dbresult.rows._array,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
const editTodoss = (dispatch) => {
  return async (id, title) => {
    try {
      const dbresult = await editTodos(id, title);
      dispatch({
        type: EDIT_TODOS,
        data: { id: id, title: title },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
const deleteTodoss = (dispatch) => {
  return async (id, title) => {
    try {
      const dbresult = await deleteTodos(id);
      dispatch({
        type: DEL_TODOS,
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const { Context, Provider } = dataContext(
  TodoReducer,
  {
    addTodos,
    loadTodos,
    editTodoss,
    deleteTodoss,
  },
  []
);
