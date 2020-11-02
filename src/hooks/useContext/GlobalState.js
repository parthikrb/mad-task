import React, { useReducer } from "react";
import context from "./Context";
import reducer from "../../store/reducer";
import * as types from "../../store/actionType";
import { getStorageItem } from "../../utils/storage/storage";

const initialState = {
  payload: JSON.parse(getStorageItem("payload")) || {},
};

const GlobalState = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateSelectedInputFieldList = (payload) => {
    dispatch({ type: types.UPDATE_SELECTED_FIELD_LIST, payload });
  };
  const clearSelectedInputFieldList = (payload) => {
    dispatch({ type: types.CLEAR_SELECTED_FIELD_LIST, payload });
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
