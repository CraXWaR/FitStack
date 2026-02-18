import React from "react";

import styles from "./Success.module.css";

interface ISuccess {
    message?: string;
}

const Success: React.FC<ISuccess> = ({ message }) => {
    if (!message) return null;

    return (
        <div className={styles.alert} role="status">
            <p className={styles.message}>{message}</p>
        </div>
    );
};

export default Success;