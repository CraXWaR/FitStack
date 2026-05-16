import React, {useState} from "react";

import Modal from "../../Layout/UI/Modal/Modal.tsx";
import InputField from "../../Layout/UI/InputField/InputField.tsx";
import Button from "../../Layout/UI/Button/Button.tsx";

import styles from "./AddSetModal.module.css";


interface AddSetModalProps {
    exerciseName: string;
    currentSets: number;
    defaultReps?: number;
    defaultWeight?: number;
    onClose: () => void;
    onAdd: (reps: number, weight: number) => void;
}

const AddSetModal: React.FC<AddSetModalProps> = ({exerciseName, onClose, onAdd, defaultReps, defaultWeight}) => {
    const [reps, setReps] = useState(defaultReps ? String(defaultReps) : "");
    const [weight, setWeight] = useState(defaultWeight ? String(defaultWeight) : "");
    const [errors, setErrors] = useState<{ reps?: string; weight?: string }>({});

    const validate = () => {
        const e: { reps?: string; weight?: string } = {};
        if (!reps || isNaN(Number(reps)) || Number(reps) <= 0) e.reps = "Reps must be at least 1";
        if (isNaN(Number(weight)) || Number(weight) < 0) e.weight = "Weight cannot be negative";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        onAdd(Number(reps), weight === "" ? 0 : Number(weight));
        onClose();
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSubmit();
    };

    return (
        <Modal title={`Log Set for ${exerciseName}`} onClose={onClose}>
            <div className={styles.inputs} onKeyDown={handleKey}>
                <div className={styles.inputGroup}>
                    <InputField
                        label="Reps"
                        type="number"
                        value={reps}
                        min={1}
                        onChange={(v) => {
                            setReps(String(v));
                            setErrors(prev => ({...prev, reps: undefined}));
                        }}
                    />
                    {errors.reps && <span className={styles.error}>{errors.reps}</span>}
                </div>

                <div className={styles.inputSep}>×</div>

                <div className={styles.inputGroup}>
                    <InputField
                        label="Weight"
                        type="number"
                        value={weight}
                        min={0}
                        onChange={(v) => {
                            setWeight(String(v));
                            setErrors(prev => ({...prev, weight: undefined}));
                        }}
                    />
                    {errors.weight && <span className={styles.error}>{errors.weight}</span>}
                </div>

                {reps && weight && !isNaN(Number(reps)) && !isNaN(Number(weight)) && (
                    <div className={styles.preview}>
                        Volume: <strong>{(Number(reps) * Number(weight)).toLocaleString()} kg</strong>
                    </div>
                )}
            </div>

            <div className="flex justify-end w-full">
                <Button variant={"primary"} className={"a"} onClick={handleSubmit}>
                    Log Set
                </Button>
            </div>
        </Modal>
    );
};

export default AddSetModal;