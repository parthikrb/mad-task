import React, { useReducer } from "react";
import context from "./Context";
import {
  reducer,
  UPDATE_SELECTED_FIELD_LIST,
  CLEAR_SELECTED_FIELD_LIST,
} from "./reducer";
import { getStorageItem } from "../../utils/storage/storage";

const initialState = {
  payload: JSON.parse(getStorageItem("payload")) || {},
};

const GlobalState = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateSelectedInputFieldList = (payload) => {
    dispatch({ type: UPDATE_SELECTED_FIELD_LIST, payload });
  };
  const clearSelectedInputFieldList = (payload) => {
    dispatch({ type: CLEAR_SELECTED_FIELD_LIST, payload });
  };

  const { children } = props;
  return (
    <context.Provider
      value={{
        state,
        updateSelectedInputFieldList,
        clearSelectedInputFieldList,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default GlobalState;
