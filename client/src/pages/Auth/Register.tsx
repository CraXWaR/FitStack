import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm.tsx";
import type {IRegisterUser} from "../../types/auth.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router";

const RegisterPage: React.FC = () => {
    const {register, loading, error} = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (data: IRegisterUser) => {
        await register(data);
        navigate("/login");
    };

    const fields = [
        {name: "firstName", label: "First Name", type: "text"},
        {name: "email", label: "Email", type: "email"},
        {name: "password", label: "Password", type: "password"},
        {name: "confirmPassword", label: "Confirm Password", type: "password"},
    ];

    return (
        <>
            <AuthForm<IRegisterUser>
                title="Create Account"
                fields={fields} submitText="Register"
                onSubmit={handleRegister}/>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </>

    );
};

export default RegisterPage;
