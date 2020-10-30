
export const UPDATE_SELECTED_FIELD_LIST = 'UPDATE_SELECTED_FIELD_LIST';
export const CLEAR_SELECTED_FIELD_LIST = 'CLEAR_SELECTED_FIELD_LIST';

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_FIELD_LIST:
      let payloadTemp = state.payload || {};
      let payLoadId = action.payload.id || 0;
      if(payLoadId){
        payloadTemp[payLoadId] = action.payload;
      }
      return { ...state, payload: payloadTemp };
    case CLEAR_SELECTED_FIELD_LIST:
        return { ...state, payload: {} };
    default:
      return state;
  }
};