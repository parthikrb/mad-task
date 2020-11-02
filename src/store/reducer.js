import * as types from "./actionType";

const reducer = (state, action) => {
  switch (action.type) {
    case types.UPDATE_SELECTED_FIELD_LIST:
      let payloadTemp = state.payload || {};
      let payLoadId = action.payload.id || 0;
      if (payLoadId) {
        payloadTemp[payLoadId] = action.payload;
      }
      return { ...state, payload: payloadTemp };
    case types.CLEAR_SELECTED_FIELD_LIST:
      return { ...state, payload: {} };
    default:
      return state;
  }
};

export default reducer;
