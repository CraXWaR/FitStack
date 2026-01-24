import styles from "./CTA.module.css";

const CTA = () => {
    return (
        <section className={styles.cta}>
            <h2>Stop guessing. Start tracking.</h2>
            <button className={styles.primaryButton}>
                Create your account
            </button>
        </section>
    );
};

export default CTA;
