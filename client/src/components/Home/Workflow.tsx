import styles from "./WorkflowSection.module.css";

const steps = [
    "Open the app",
    "Start your workout",
    "Log sets as you train",
    "Review progress over time"
];

const WorkflowSection = () => {
    return (
        <section className={styles.section}>
            <h2>Designed around your workout</h2>

            <ul>
                {steps.map(step => (
                    <li key={step}>{step}</li>
                ))}
            </ul>
        </section>
    );
};

export default WorkflowSection;