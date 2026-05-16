import {useState, useEffect, useRef, type FocusEvent} from "react";
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
    const [localValue, setLocalValue] = useState(String(value ?? ""));
    const inputRef = useRef<HTMLInputElement>(null);

    const isPassword = type === "password";
    const hasValue = localValue !== "" && localValue !== null && localValue !== undefined;

    // Sync external value changes only when the input is not focused
    useEffect(() => {
        if (document.activeElement !== inputRef.current) {
            setLocalValue(String(value ?? ""));
        }
    }, [value]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) setIsFocused(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        setLocalValue(raw);

        if (type === "number") {
            const parsed = parseFloat(raw);
            if (!isNaN(parsed)) {
                onChange(parsed as Type);
            }
        } else {
            onChange(raw as Type);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputWrapper}>
                <input
                    ref={inputRef}
                    id={id || name}
                    name={name}
                    type={isPassword ? (showPassword ? "text" : "password") : type}
                    value={localValue}
                    onChange={handleChange}
                    placeholder=" "
                    className={styles.input}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required={required}
                    disabled={disabled}
                    min={min}
                    max={max}
                    step={type === "number" ? "any" : undefined}
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