import React from "react";
import {Link} from "react-router-dom";
import styles from "./Button.module.css";
import type {IButtonProps} from "../../../../types/button.ts";

const Button: React.FC<IButtonProps> = ({
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