import { Navigate } from "react-router-dom";
import React, {useState} from "react";
const Protected = ({ isLoggedIn, children }) => {
    isLoggedIn =useState(localStorage.getItem(localStorage.getItem("isLoggedIn")|| false));

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;