import React from 'react';
import SignIn from '../views/SignIn/SignIn';

const Authentication = props => {
  const { history, location } = props;
  return (
        <SignIn 
          history={history} 
          location={location}
        />
  );
};

export default Authentication;
