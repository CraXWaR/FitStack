import React, {useState} from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import type {IRegisterUser} from "../../types/auth";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router";
import Loading from "../../components/Layout/General/Loading/Loading";
import styles from "./Register.module.css";

const RegisterPage: React.FC = () => {
    const {register, loading} = useAuth();
    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (data: IRegisterUser) => {
        try {
            setFormError(null);
            await register(data);
            navigate("/");
        } catch (err: any) {
            if (Array.isArray(err)) {
                setFormError(err.join("\n"));
            } else {
                setFormError(err || "Registration failed");
            }
        }
    };

    if (loading) return <Loading/>;

    const fields = [
        {name: "firstName", label: "First Name", type: "text"},
        {name: "email", label: "Email", type: "email"},
        {name: "password", label: "Password", type: "password"},
        {name: "confirmPassword", label: "Confirm Password", type: "password"},
    ];

    return (
        <div className={styles.pageWrapper}>
            <AuthForm<IRegisterUser>
                title="Create Account"
                submitText="Register"
                onSubmit={handleRegister}
                fields={fields}
                formError={formError}
            />
            <p className={styles.switchPage}>
                Already have an account? <span onClick={() => navigate("/login")}>Login</span>
            </p>
        </div>
    );
};

export default RegisterPage;
