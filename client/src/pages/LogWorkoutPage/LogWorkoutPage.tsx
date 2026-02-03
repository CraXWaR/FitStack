import React, {useState} from "react";
import styles from "./LogWorkoutPage.module.css";
import InputField from "../../components/Workout/InputField.tsx";
import SetInput from "../../components/Workout/SetInput.tsx";


const dummyExercises = [
    "Bench Press",
    "Squat",
    "Deadlift",
    "Overhead Press",
    "Barbell Row",
];

const LogWorkoutPage: React.FC = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [exercise, setExercise] = useState(dummyExercises[0]);
    const [sets, setSets] = useState([{reps: "", weight: ""}]);

    const handleSetChange = (index: number, field: "reps" | "weight", value: string) => {
        const newSets = [...sets];

        if (value === "") {
            newSets[index][field] = "";
        } else {
            let num = Number(value);
            if (num < 0) num = 0;
            if (num === 0) {
                newSets[index][field] = "";
            } else {
                newSets[index][field] = String(num);
            }
        }

        setSets(newSets);
    };


    const addSet = () => setSets([...sets, {reps: "", weight: ""}]);
    const removeSet = (index: number) => setSets(sets.filter((_, i) => i !== index));

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg-main text-text-primary">
            <div className={styles.formContainer}>
                <h2 className={styles.title}>Log Your Workout</h2>

                <InputField
                    label="Workout Name"
                    value={name}
                    onChange={setName}
                />

                <InputField
                    label="Date & Time"
                    value={date}
                    onChange={setDate}
                    type="datetime-local"
                />

                <div className={styles.wrapper}>
                    <label className={styles.label}>Exercise</label>
                    <select
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)}
                        className={styles.select}
                    >
                        {dummyExercises.map((ex, i) => (
                            <option key={i} value={ex}>{ex}</option>
                        ))}
                    </select>
                    <p className={styles.helper}>Choose the exercise you performed</p>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                    {sets.map((set, i) => (
                        <SetInput
                            key={i}
                            index={i}
                            reps={set.reps}
                            weight={set.weight}
                            onChange={handleSetChange}
                            onRemove={removeSet}
                        />
                    ))}
                    <button type="button" onClick={addSet} className={styles.addButton}>
                        Add Set
                    </button>
                </div>

                <button className={styles.saveButton}>Save Workout</button>
            </div>
        </div>
    );
};

export default LogWorkoutPage;
