import React, {useState} from "react";
import type {IRegisterUser} from "../../types/auth";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router";
import Loading from "../../components/Layout/General/Loading/Loading";
import styles from "./AuthPages.module.css";
import Form from "../../components/Layout/UI/Form/Form.tsx";
import InputField from "../../components/Layout/UI/InputField/InputField.tsx";

const RegisterPage: React.FC = () => {
    const {register, loading} = useAuth();
    const navigate = useNavigate();

    const [formError, setFormError] = useState<string | null>(null);
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: IRegisterUser = {
            firstName,
            email,
            password,
            confirmPassword,
        };
        handleRegister(formData);
    };

    if (loading) return <Loading/>;

    return (
        <div className={styles.pageWrapper}>
            <Form title="Create Account" submitText="Register" onSubmit={handleSubmit} error={formError}>
                <InputField label="First Name" type="text" value={firstName} onChange={setFirstName} required/>

                <InputField label="Email" type="email" value={email} onChange={setEmail} required/>

                <InputField label="Password" type="password" value={password} onChange={setPassword} required/>

                <InputField label="Confirm Password" type="password" value={confirmPassword}
                            onChange={setConfirmPassword} required/>
            </Form>

            <p className={styles.switchPage}>
                Already have an account?{" "}
                <span onClick={() => navigate("/login")}>Login</span>
            </p>
        </div>
    );
};

export default RegisterPage;