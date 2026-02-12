import React from "react";
import styles from "./Error.module.css";

interface IError {
    messages?: string[];
}

const Error: React.FC<IError> = ({messages = []}) => {
    if (!messages.length) return null;

    return (
        <div className={styles.alert} role="alert">
            {messages.map((message, index) => (
                <p key={index} className={styles.message}>{message}</p>
            ))}
        </div>
    );
};

export default Error;
