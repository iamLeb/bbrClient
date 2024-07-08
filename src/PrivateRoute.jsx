// PrivateRoute.jsx
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import UserContext from "./context/UserContext.js";

const PrivateRoute = ({ element, ...rest }) => {
    const { user } = useContext(UserContext);

    return (
        <Route
            {...rest}
            element={user ? element : <Navigate to="/auth/login" replace />}
        />
    );
};

export default PrivateRoute;
