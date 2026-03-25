import React from "react";

import Button from "../../Layout/UI/Button/Button.tsx";
import styles from "./CTA.module.css";

const CTA: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.glow}/>
            <div className={styles.inner}>
                <p className={styles.eyebrow}>Free to start. Always.</p>
                <h2 className={styles.title}>
                    Stop guessing.<br/>Start lifting smarter.
                </h2>
                <Button variant={'primary'} to={'/register'}>Create your account</Button>
            </div>
        </section>
    );
};

export default CTA;