import React, {createContext, useContext, useEffect, useState} from "react";
import type {IAuthContext} from "../types/auth.ts";
import type {IUserResponse} from "../types/user.ts";
import {authService} from "../services/authService.ts";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<IUserResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const savedToken = sessionStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
            authService.getUser().then(setUser).catch(() => logout());
        }
        setLoading(false);
    }, []);

    const setAuthUser = (payload: { token: string }) => {
        setToken(payload.token);
        sessionStorage.setItem("token", payload.token);
    };

    const logout = () => {
        setToken(null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("firstName");
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token,
                user,
                loading,
                setUser,
                setAuthUser,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within AuthProvider");
    }

    return context;
}