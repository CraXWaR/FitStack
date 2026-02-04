import React from "react";
import type {IError} from "../../../../types/common.ts";
import styles from "./Error.module.css";

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
