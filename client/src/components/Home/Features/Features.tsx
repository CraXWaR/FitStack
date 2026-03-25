import React from "react";

import {FiRefreshCcw, FiTrendingUp, FiZap} from "react-icons/fi";
import styles from "./Features.module.css";

const Features: React.FC = () => {
    return (
        <section className={styles.section}>
            <p className={styles.eyebrow}>Everything you need</p>
            <h2 className={styles.title}>One place. Every lift.</h2>

            <div className={styles.grid}>
                <div className={`${styles.card} ${styles.cardLarge}`}>
                    <div className={styles.icon}><FiZap size={22}/></div>
                    <h3>Instant logging</h3>
                    <p>
                        Log a set in under three taps. Designed to be used between
                        sets without breaking your focus or flow.
                    </p>
                    <div className={styles.logPreview}>
                        <div className={styles.logRow}>
                            <span>Squat</span>
                            <span className={styles.accent}>5 × 5 · 120 kg</span>
                        </div>
                        <div className={styles.logRow}>
                            <span>Romanian DL</span>
                            <span className={styles.accent}>4 × 8 · 80 kg</span>
                        </div>
                        <div className={`${styles.logRow} ${styles.logActive}`}>
                            <span>Leg Press</span>
                            <span className={styles.logLogging}>logging…</span>
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.icon}><FiTrendingUp size={22}/></div>
                    <h3>Progressive overload</h3>
                    <p>
                        FitStack watches your history and tells you exactly when
                        to add weight or reps.
                    </p>
                </div>

                <div className={styles.card}>
                    <div className={styles.icon}><FiRefreshCcw size={22}/></div>
                    <h3>Program management</h3>
                    <p>
                        Build PPL, Upper/Lower, or any custom split. We track
                        which day comes next.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Features;