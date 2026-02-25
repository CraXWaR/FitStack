import React from "react";
import {Navigate, Outlet} from "react-router";

import {useAuthContext} from "../context/AuthContext.tsx";

import Loading from "./Layout/General/Loading/Loading.tsx";

export const ProtectedRoute: React.FC = () => {
    const {isLoggedIn, loading} = useAuthContext();
    if (loading) return <Loading/>;

    if (!isLoggedIn) {
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;
};

export default ProtectedRoute;