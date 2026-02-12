import type {IUserResponse} from "./user.ts";
import React from "react";

export interface IRegisterUser {
    firstName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IAuthResponse {
    token: string;
    firstName: string;
}

export interface IAuthContext {
    isLoggedIn: boolean;
    token: string | null;
    user: IUserResponse | null;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUserResponse | null>>;
    setAuthUser: (payload: { token: string }) => void;
    logout: () => void;
}