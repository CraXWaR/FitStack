import React from "react";
import styles from "./HowItWorks.module.css";

const STEPS = [
    { n: "01", title: "Open FitStack",      desc: "Your next programmed day loads instantly. No decisions needed." },
    { n: "02", title: "Start the workout",  desc: "Timer starts. Rest periods tracked automatically." },
    { n: "03", title: "Log as you lift",    desc: "Tap in sets and reps. See last session right alongside." },
    { n: "04", title: "Review & improve",   desc: "FitStack flags exactly where you're ready to progress." },
];

const HowItWorks: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <p className={styles.eyebrow}>Workflow</p>
                <h2 className={styles.title}>As fast as picking up the bar.</h2>
                <div className={styles.steps}>
                    {STEPS.map(({ n, title, desc }) => (
                        <div key={n} className={styles.step}>
                            <span className={styles.stepN}>{n}</span>
                            <h4>{title}</h4>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;