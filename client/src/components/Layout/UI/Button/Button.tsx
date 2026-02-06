import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    variant?: "primary" | "outline" | "remove";
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           onClick,
                                           type = "button",
                                           disabled = false,
                                           variant = "primary",
                                           className = "",
                                       }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${styles.button} ${styles[variant]} ${className}`}>
            {children}
        </button>
    );
};

export default Button;
