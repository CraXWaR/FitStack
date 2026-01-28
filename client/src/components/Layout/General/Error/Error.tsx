import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import styles from "./Error.module.css";
import type {IError} from "../../../../types/common.ts";

const Error: React.FC<IError> = ({messages = ["Something went wrong."], actionText, onAction,}) => {
    return (
        <div className="flex items-center justify-center bg-(--bg-main)">
            <div className={styles.card}>
                <FiAlertCircle size={26} className={styles.icon} />

                {messages.map((msg, i) => (
                    <p key={i} className={styles.message}>
                        {msg}
                    </p>
                ))}

                {actionText && onAction && (
                    <button
                        onClick={onAction}
                        className={styles.action}>
                        {actionText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Error;
