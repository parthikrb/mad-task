import React from "react";
import { Route, Redirect } from "react-router-dom";
import authentication from "../utils/Authentication";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authentication.isAuthenticated()) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};
