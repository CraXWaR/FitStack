import React from "react";

import Button from "../../Layout/UI/Button/Button.tsx";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.glow}/>

            <div className={styles.copy}>
                <p className={styles.eyebrow}>Built for the gym floor</p>
                <h1 className={styles.title}>
                    Your next PR<br/>starts here.
                </h1>
                <p className={styles.lead}>
                    Log sets, track progress, and let FitStack tell you exactly
                    when to push harder. No noise. No fluff.
                </p>
                <div className={styles.actions}>
                    <Button variant={'primary'} to={'/register'}>Start for free</Button>
                </div>
                <p className={styles.socialProof}>
                    Joined by <strong>2,400+</strong> lifters this month
                </p>
            </div>

            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <span className={styles.cardTag}>Today · Push A</span>
                    <span className={styles.cardLive}>LIVE</span>
                </div>
                <div className={styles.exRow}>
                    <span>Bench Press</span>
                    <span className={styles.exDetail}>4 × 5 · 90 kg</span>
                </div>
                <div className={styles.exRow}>
                    <span>Overhead Press</span>
                    <span className={styles.exDetail}>3 × 8 · 60 kg</span>
                </div>
                <div className={`${styles.exRow} ${styles.exActive}`}>
                    <span>Incline DB Press</span>
                    <span className={styles.exDetail}>Set 2 / 4</span>
                </div>
                <div className={styles.overloadTip}>
                    <span className={styles.tipDot}/>
                    Add 2.5 kg next session — you're ready.
                </div>
            </div>
        </section>
    );
};

export default Hero;