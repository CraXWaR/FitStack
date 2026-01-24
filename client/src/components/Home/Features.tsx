import styles from "./FeaturesSection.module.css";

const features = [
    {
        title: "Log workouts in seconds",
        text: "Record sets and reps without menus, clutter or distractions."
    },
    {
        title: "See your last performance",
        text: "Always know what you lifted last time. Progressive overload made simple."
    },
    {
        title: "Built for the gym",
        text: "Dark, minimal interface designed to be used between sets."
    }
];

const FeaturesSection = () => {
    return (
        <section className={styles.section}>
            {features.map((f) => (
                <div key={f.title} className={styles.card}>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                </div>
            ))}
        </section>
    );
};

export default FeaturesSection;