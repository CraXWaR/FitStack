import React from "react";
import styles from "./Stats.module.css";

const STATS = [
    { n: "70+", label: "Exercises" },
    { n: "8",   label: "Categories" },
    { n: "100%",label: "Ad-free" },
    { n: "0",   label: "Bloat" },
];

const Stats: React.FC = () => {
    return (
        <div className={styles.strip}>
            {STATS.map(({ n, label }) => (
                <div key={label} className={styles.stat}>
                    <span className={styles.number}>{n}</span>
                    <span className={styles.label}>{label}</span>
                </div>
            ))}
        </div>
    );
};

export default Stats;