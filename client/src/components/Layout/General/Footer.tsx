import React from "react";
import styles from "./Footer.module.css"

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className={styles.brand}>FitStack</span>

                <span className={styles.copy}>
                    © {new Date().getFullYear()} All rights reserved
                </span>
            </div>
        </footer>
    );
};

export default Footer;