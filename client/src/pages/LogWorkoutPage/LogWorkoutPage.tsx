import React, {useState} from "react";
import styles from "./LogWorkoutPage.module.css";
import InputField from "../../components/Workout/InputField.tsx";
import SetInput from "../../components/Workout/SetInput.tsx";
import {useExercises} from "../../hooks/useExercises.ts";
import Loading from "../../components/Layout/General/Loading/Loading.tsx";
import Error from "../../components/Layout/General/Error/Error.tsx";

const LogWorkoutPage: React.FC = () => {
    const {exercises, loading, error} = useExercises();

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedExercise, setSelectedExercise] = useState("");
    const [sets, setSets] = useState([{reps: "", weight: ""}]);

    const categories = Array.from(new Set(exercises.map(e => e.category)));

    const filteredExercises = selectedCategory
        ? exercises.filter(e => e.category === selectedCategory)
        : [];

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

    if (loading) return <Loading text="Loading exercises..."/>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg-main text-text-primary w-full">
            <div className={styles.formContainer}>
                <h2 className={styles.title}>Log Your Workout</h2>

                <InputField label="Workout Name" value={name} onChange={setName}/>

                <InputField label="Date & Time" value={date} onChange={setDate} type="datetime-local"/>

                {/* error */}
                {error && (
                    <Error
                        messages={Array.isArray(error) ? error : [error]}
                    />
                )}

                {/* show category/exercise if no error */}
                {!error && (
                    <>
                        <div className={styles.wrapper}>
                            <label className={styles.label}>Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setSelectedExercise("");
                                }}
                                className={styles.select}>
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.wrapper}>
                            <label className={styles.label}>Exercise</label>
                            <select
                                value={selectedExercise}
                                onChange={(e) => setSelectedExercise(e.target.value)}
                                className={styles.select}
                                disabled={!selectedCategory}>
                                <option value="">Select exercise</option>
                                {filteredExercises.map((ex) => (
                                    <option key={ex.id} value={ex.name}>{ex.name}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

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

                <button className={styles.saveButton} disabled={!!error}>Save Workout</button>
            </div>
        </div>
    );
};

export default LogWorkoutPage;
