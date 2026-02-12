import {useState, type FocusEvent} from "react";
import styles from "./InputField.module.css";
import {FaEye, FaEyeSlash} from "react-icons/fa";

interface InputFieldProps<Type extends string | number = string> {
    label: string;
    value: Type;
    onChange: (value: Type) => void;
    type?: "text" | "email" | "password" | "number" | "datetime-local";
    placeholder?: string;
    name?: string;
    id?: string;
    required?: boolean;
    disabled?: boolean;
    min?: number;
    max?: number;
}

const InputField = <Type extends string | number>({
                                                      label,
                                                      value,
                                                      onChange,
                                                      type = "text",
                                                      name,
                                                      id,
                                                      required = false,
                                                      disabled = false,
                                                      min,
                                                      max,
                                                  }: InputFieldProps<Type>) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPassword = type === "password";
    const hasValue = value !== "" && value !== null && value !== undefined;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) setIsFocused(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputWrapper}>
                <input
                    id={id || name}
                    name={name}
                    type={isPassword ? (showPassword ? "text" : "password") : type}
                    value={value}
                    onChange={(e) => {
                        const value = type === "number" ? Number(e.target.value) : e.target.value;
                        onChange(value as Type);
                    }}
                    placeholder=" "
                    className={styles.input}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required={required}
                    disabled={disabled}
                    min={min}
                    max={max}
                />
                <label
                    htmlFor={id || name}
                    className={`${styles.label} ${isFocused || hasValue ? styles.floating : ""}`}>
                    {label}
                </label>
                {isPassword && (
                    <span
                        className={styles.icon}
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                    </span>
                )}
            </div>
        </div>
    );
};

export default InputField;