import React, {useState} from "react";

import Modal from "../../Layout/UI/Modal/Modal.tsx";
import InputField from "../../Layout/UI/InputField/InputField.tsx";
import Button from "../../Layout/UI/Button/Button.tsx";

import styles from "./AddSetModal.module.css";


interface AddSetModalProps {
    exerciseName: string;
    currentSets: number;
    onClose: () => void;
    onAdd: (reps: number, weight: number) => void;
}

const AddSetModal: React.FC<AddSetModalProps> = ({exerciseName, onClose, onAdd}) => {
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");

    const validate = () => {
        const e: { reps?: string; weight?: string } = {};
        if (!reps || isNaN(Number(reps)) || Number(reps) <= 0) e.reps = "Required";
        if (weight === "" || isNaN(Number(weight)) || Number(weight) < 0) e.weight = "Required";
        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        onAdd(Number(reps), Number(weight));
        onClose();
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSubmit();
    };

    return (
        <Modal title={`Log Set for ${exerciseName}`} onClose={onClose}>
            <div className={styles.inputs} onKeyDown={handleKey}>
                <InputField
                    label="Reps"
                    type="number"
                    value={reps}
                    min={1}
                    onChange={(v) => {
                        setReps(String(v));
                    }}
                />

                <div className={styles.inputSep}>×</div>

                <InputField
                    label="Weight"
                    type="number"
                    value={weight}
                    min={0}
                    onChange={(v) => {
                        setWeight(String(v));
                    }}
                />

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