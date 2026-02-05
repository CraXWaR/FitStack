import React, {useState} from "react";
import styles from "./SetInput.module.css";
import {AiOutlineClose} from "react-icons/ai";
import type {IWorkoutExerciseSetProps} from "../../types/exercise.ts";

const SetInput: React.FC<IWorkoutExerciseSetProps> = ({ id, reps, weight, onChange, onRemove }) => {
    const [localReps, setLocalReps] = useState<string>(reps > 0 ? String(reps) : "");
    const [localWeight, setLocalWeight] = useState<string>(weight > 0 ? String(weight) : "");

    const handleRepsChange = (value: string) => {
        setLocalReps(value);
        onChange(id, "reps", value === "" ? 0 : Number(value));
    };

    const handleWeightChange = (value: string) => {
        setLocalWeight(value);
        onChange(id, "weight", value === "" ? 0 : Number(value));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.field}>
                <input
                    type="number"
                    value={localReps}
                    onChange={(e) => handleRepsChange(e.target.value)}
                    className={`${styles.input} ${localReps ? styles.hasValue : ""}`}
                    placeholder=" "
                    min={0}
                />
                <label className={styles.label}>Reps</label>
            </div>

            <div className={styles.field}>
                <input
                    type="number"
                    value={localWeight}
                    onChange={(e) => handleWeightChange(e.target.value)}
                    className={`${styles.input} ${localWeight ? styles.hasValue : ""}`}
                    placeholder=" "
                    min={0}
                />
                <label className={styles.label}>Weight (kg)</label>
            </div>

            <button type="button" onClick={onRemove} className={styles.removeButton} title="Remove set">
                <AiOutlineClose size={18} />
            </button>
        </div>
    );
};

export default SetInput;