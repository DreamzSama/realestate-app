// PrivateRoute.jsx
import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, user }) => {
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
