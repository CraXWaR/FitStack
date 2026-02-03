import React from "react";
import styles from "./InputField.module.css";

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = "text", }) => {
    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={styles.input}
            />
        </div>
    );
};

export default InputField;
