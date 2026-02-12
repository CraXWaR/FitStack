import React from "react";
import styles from "./Loading.module.css";

interface ILoading {
    text?: string;
}

const Loading: React.FC<ILoading> = ({text = "Please wait..."}) => {
    return (
        <div className="w-full flex items-center justify-center bg-(--bg-main)">
            <div className="flex flex-col items-center gap-4">
                <div className={styles.track}>
                    <div className={styles.bar}/>
                </div>

                <p className="text-sm text-(--text-secondary) tracking-wide">
                    {text}
                </p>
            </div>
        </div>
    );
}

export default Loading;