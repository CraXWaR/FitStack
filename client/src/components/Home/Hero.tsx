import React from "react";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.inner}>
                <span className={styles.kicker}>WORKOUT LOGGING, SIMPLIFIED</span>

                <h1 className={styles.title}>
                    Log your workouts.
                    <br />
                    Faster than writing them down.
                </h1>

                <p className={styles.subtitle}>
                    FitStack is a minimal workout tracker built for the gym.
                    No clutter. No distractions. Just your sets, your progress,
                    and your next lift.
                </p>

                <div className={styles.actions}>
                    <button className={styles.primary}>Get started</button>
                    <button className={styles.secondary}>See how it works</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;