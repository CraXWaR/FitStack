import React, {useState} from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import type {ILoginUser} from "../../types/auth";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router";
import Loading from "../../components/Layout/General/Loading/Loading";
import styles from "./Login.module.css";

const LoginPage: React.FC = () => {
    const {login, loading} = useAuth();
    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (data: ILoginUser) => {
        try {
            setFormError(null);
            await login(data);
            navigate("/");
        } catch (err: any) {
            if (Array.isArray(err)) {
                setFormError(err.join("\n"));
            } else {
                setFormError(err || "Login failed");
            }
        }
    };

    if (loading) return <Loading/>;

    return (
        <div className={styles.pageWrapper}>
            <AuthForm<ILoginUser>
                title="Welcome Back"
                submitText="Login"
                onSubmit={handleLogin}
                fields={[
                    {name: "email", label: "Email", type: "email"},
                    {name: "password", label: "Password", type: "password"},
                ]}
                formError={formError}
            />
            <p className={styles.switchPage}>
                Don't have an account? <span onClick={() => navigate("/register")}>Register</span>
            </p>
        </div>
    );
};

export default LoginPage;
