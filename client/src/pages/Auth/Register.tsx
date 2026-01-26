import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm.tsx";
import type {IRegisterUser} from "../../types/auth.tsx";

const RegisterPage: React.FC = () => {
    const handleRegister = (data: IRegisterUser) => {
        console.log("Register payload:", data);

        //TODO DO API CALL
    };

    const fields = [
        { name: "firstName", label: "First Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
        { name: "confirmPassword", label: "Confirm Password", type: "password" },
    ];

    return (<AuthForm<IRegisterUser> title="Create Account" fields={fields} submitText="Register" onSubmit={handleRegister} />);
};

export default RegisterPage;
