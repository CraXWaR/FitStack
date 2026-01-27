import React, {createContext, useContext, useEffect, useState} from "react";
import type {IAuthContext} from "../types/auth.tsx";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [token, setToken] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = sessionStorage.getItem("token");
        const savedFirstName = sessionStorage.getItem("firstName");

        if (savedToken && savedFirstName) {
            setToken(savedToken);
            setFirstName(savedFirstName);
        }
    }, []);

    const setAuthUser = (payload: { token: string; firstName: string }) => {
        setToken(payload.token);
        setFirstName(payload.firstName);
        sessionStorage.setItem("token", payload.token);
        sessionStorage.setItem("firstName", payload.firstName);
    };

    const logout = () => {
        setToken(null);
        setFirstName(null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("firstName");
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                firstName,
                token,
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