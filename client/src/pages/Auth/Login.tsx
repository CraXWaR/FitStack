import React, {useState} from "react";
import type {ILoginUser} from "../../types/auth";
import {useAuth} from "../../hooks/auth/useAuth.ts";
import {useNavigate} from "react-router";
import Loading from "../../components/Layout/General/Loading/Loading";
import styles from "./AuthPages.module.css";
import Form from "../../components/Layout/UI/Form/Form.tsx";
import InputField from "../../components/Layout/UI/InputField/InputField.tsx";

const LoginPage: React.FC = () => {
    const {login, loading} = useAuth();
    const [formError, setFormError] = useState<string[]>([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleLogin = async (data: ILoginUser) => {
        try {
            setFormError([]);
            await login(data);
            navigate("/");
        } catch (err: any) {
            if (Array.isArray(err)) {
                setFormError(err);
            } else {
                setFormError([err || "Login failed"]);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: ILoginUser = {email, password};
        handleLogin(formData);
    };

    if (loading) return <Loading/>;

    return (
        <div className={styles.pageWrapper}>
            <Form title="Welcome Back" submitText="Login" onSubmit={handleSubmit} error={formError}>
                <InputField label="Email"
                            type="email"
                            value={email}
                            onChange={setEmail}/>

                <InputField label="Password"
                            type="password"
                            value={password}
                            onChange={setPassword}/>
            </Form>

            <p className={styles.switchPage}>
                Don't have an account? <span onClick={() => navigate("/register")}>Register</span>
            </p>
        </div>
    );
};

export default LoginPage;
