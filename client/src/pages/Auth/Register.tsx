import React, {useEffect, useState} from "react";
import AuthForm from "../../components/AuthForm/AuthForm.tsx";
import type {IRegisterUser} from "../../types/auth.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router";
import Loading from "../../components/Layout/General/Loading/Loading.tsx";
import Error from "../../components/Layout/General/Error/Error.tsx";

const RegisterPage: React.FC = () => {
    const [showError, setShowError] = useState(true);

    const {register, loading, error} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) setShowError(true);
    }, [error]);

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

    if (loading) return <Loading />;
    if (error && showError) return <Error messages={error} actionText="Try again" onAction={() => setShowError(false)} />;

    return (<AuthForm<IRegisterUser> title="Create Account" fields={fields} submitText="Register" onSubmit={handleRegister}/>);
};

export default RegisterPage;
