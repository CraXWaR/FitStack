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