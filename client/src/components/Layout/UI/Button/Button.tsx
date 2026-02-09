import React from "react";
import {Link} from "react-router-dom";
import styles from "./Button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "outline" | "remove";
    to?: string;
}

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           onClick,
                                           type = "button",
                                           disabled = false,
                                           className,
                                           variant = "primary",
                                           to,
                                       }) => {
    const commonClasses = `${styles.button} ${styles[variant]} ${className} ${disabled ? styles.disabled : ""}`;

    // Link
    if (to) {
        return (
            <Link
                to={to}
                className={commonClasses}
                onClick={disabled ? (e) => e.preventDefault() : onClick}
            >
                {children}
            </Link>
        );
    }

    // Normal button
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={commonClasses}>
            {children}
        </button>
    );
};

export default Button;