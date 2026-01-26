import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm.tsx";
import type {ILoginUser} from "../../types/auth.tsx";

const LoginPage: React.FC = () => {
    const handleLogin = (data: ILoginUser) => {
        console.log("Login payload:", data);
        // TODO: call login API
    };

    const fields = [
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
    ];

    return <AuthForm<ILoginUser> title="Login" fields={fields} submitText="Log in" onSubmit={handleLogin} />;
}

export default LoginPage