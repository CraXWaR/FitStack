import React, {useState} from "react";
import type {IRegisterUser} from "../../types/auth";
import {useAuth} from "../../hooks/auth/useAuth.ts";
import {useNavigate} from "react-router";
import Loading from "../../components/Layout/General/Loading/Loading";
import styles from "./AuthPages.module.css";
import Form from "../../components/Layout/UI/Form/Form.tsx";
import InputField from "../../components/Layout/UI/InputField/InputField.tsx";

const RegisterPage: React.FC = () => {
    const {register, loading} = useAuth();
    const navigate = useNavigate();

    const [formError, setFormError] = useState<string[]>([]);
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (data: IRegisterUser) => {
        try {
            setFormError([]);
            await register(data);
            navigate("/");
        } catch (err: any) {
            if (Array.isArray(err)) {
                setFormError(err);
            } else {
                setFormError([err || "Registration failed"]);
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
        handleRegister(formData).then(r => console.log(r));
    };

    if (loading) return <Loading/>;

    return (
        <div className={styles.pageWrapper}>
            <Form title="Create Account" submitText="Register" onSubmit={handleSubmit} error={formError}>
                <InputField label="First Name" type="text" value={firstName} onChange={setFirstName}/>

                <InputField label="Email" type="email" value={email} onChange={setEmail}/>

                <InputField label="Password" type="password" value={password} onChange={setPassword}/>

                <InputField label="Confirm Password" type="password" value={confirmPassword}
                            onChange={setConfirmPassword}/>
            </Form>

            <p className={styles.switchPage}>
                Already have an account?{" "}
                <span onClick={() => navigate("/login")}>Login</span>
            </p>
        </div>
    );
};

export default RegisterPage;