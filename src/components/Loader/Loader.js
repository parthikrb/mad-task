import React from 'react';
import Loader from 'react-loader-advanced';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = props => {
  const { children, active } = props;

  const spinner = (
    <span>
      <CircularProgress color="secondary" />
      <p>Loading...</p>
    </span>
  );
  
  return (
    <Loader
      foregroundStyle={{ color: 'white' }}
      show={active || false}
      message={spinner}
    >
      {children}
    </Loader>
  );
};

export default Spinner;
