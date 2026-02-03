import React from "react";
import styles from "./SetInput.module.css";
import { AiOutlineClose } from "react-icons/ai";

interface SetInputProps {
    index: number;
    reps: string;
    weight: string;
    onChange: (index: number, field: "reps" | "weight", value: string) => void;
    onRemove: (index: number) => void;
}

const SetInput: React.FC<SetInputProps> = ({ index, reps, weight, onChange, onRemove }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.field}>
                <input
                    type="number"
                    value={reps}
                    onChange={(e) => onChange(index, "reps", e.target.value)}
                    className={`${styles.input} ${reps ? styles.hasValue : ""}`}
                    placeholder=" "
                    min={0}
                />
                <label className={styles.label}>Reps</label>
            </div>

            <div className={styles.field}>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => onChange(index, "weight", e.target.value)}
                    className={`${styles.input} ${weight ? styles.hasValue : ""}`}
                    placeholder=" "
                    min={0}
                />
                <label className={styles.label}>Weight (kg)</label>
            </div>

            <button
                type="button"
                onClick={() => onRemove(index)}
                className={styles.removeButton}
                title="Remove set"
            >
                <AiOutlineClose size={18} />
            </button>
        </div>
    );
};

export default SetInput;
