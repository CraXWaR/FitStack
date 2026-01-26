import React, {useState} from "react";
import styles from "./AuthForm.module.css";

interface AuthFormField {
    name: string;
    label: string;
    type: string;
}

interface AuthFormProps<FormData> {
    title: string;
    fields: AuthFormField[];
    submitText: string;
    onSubmit: (data: FormData) => void;
}

const AuthForm = <FormData,>({ title, fields, submitText, onSubmit }: AuthFormProps<FormData>) => {
    const [formState, setFormState] = useState<FormData>(() => {
        const initial: any = {};
        fields.forEach((field) => (initial[field.name] = ""));
        return initial;
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({...formState, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                {fields.map((field) => (
                    <input
                        key={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.label}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                ))}
                <button type="submit" className={styles.submit}>
                    {submitText}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;