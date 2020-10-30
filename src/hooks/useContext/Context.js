import React from 'react';

const context = React.createContext({
  payload: {},
  updateSelectedInputFieldList: payload => {},
  clearSelectedInputFieldList: payload => {},
});

export default context;