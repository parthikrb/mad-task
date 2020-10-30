import React from "react";
import { Route, Redirect } from "react-router-dom";
import authentication from "../utils/Authentication";

export const PublicRoute = ({ auth, ...props }) => {
  const isAllowed = authentication.isAuthenticated();
  return isAllowed ? <Redirect to="/dashboard" /> : <Route {...props} />;
};
