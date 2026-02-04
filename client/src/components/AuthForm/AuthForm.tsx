import React from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import styles from "./AuthForm.module.css";

interface Field {
    name: string;
    label: string;
    type: string;
}

interface AuthFormProps<T> {
    title: string;
    submitText: string;
    fields: Field[];
    onSubmit: (data: T) => void;
    formError?: string | null;
}

function AuthForm<T>({title, submitText, fields, onSubmit, formError}: AuthFormProps<T>) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget)) as unknown as T;
        onSubmit(formData);
    };

    return (
        <div className={styles.authCard}>
            <h1 className={styles.authTitle}>{title}</h1>

            {formError && (
                <div className={styles.formError}>{formError}</div>
            )}

            <form onSubmit={handleSubmit}>
                {fields.map((field) => {
                    const isPassword = field.type === "password";
                    return (
                        <div key={field.name} className={styles.wrapper}>
                            <label htmlFor={field.name} className={styles.label}>{field.label}</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    type={isPassword ? (showPassword ? "text" : "password") : field.type}
                                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                                    className={styles.input}
                                    required
                                />
                                {isPassword && (
                                    <span
                                        className={styles.icon}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                  </span>
                                )}
                            </div>
                        </div>
                    );
                })}
                <button type="submit" className={styles.submit}>{submitText}</button>
            </form>
        </div>
    );
}


export default AuthForm;
