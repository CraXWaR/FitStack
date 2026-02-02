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
    firstName: string | null;
    token: string | null;
    setAuthUser: (payload: { token: string; firstName: string }) => void;
    logout: () => void;
}