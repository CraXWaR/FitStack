import React, {type ReactNode} from "react";
import {Navigate} from "react-router";
import {useAuthContext} from "../context/AuthContext.tsx";

interface IProtectedRoute {
    children: ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRoute> = ({children}) => {
    const {isLoggedIn, loading} = useAuthContext();
    if (loading) return <div>Loading...</div>;
    if (!isLoggedIn) return <Navigate to="/login" replace/>;

    return <>{children}</>;
};

export default ProtectedRoute;