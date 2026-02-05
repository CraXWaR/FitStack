import React, {type FormEvent} from "react";
import styles from "./LogWorkoutPage.module.css";
import InputField from "../../components/Workout/InputField.tsx";
import SetInput from "../../components/Workout/SetInput.tsx";
import {useExercises} from "../../hooks/useExercises.ts";
import Loading from "../../components/Layout/General/Loading/Loading.tsx";
import Error from "../../components/Layout/General/Error/Error.tsx";
import {useWorkoutSubmit} from "../../hooks/workout/useWorkoutSubmit.ts";
import {useWorkoutForm} from "../../hooks/workout/useWorkoutForm.ts";

const LogWorkoutPage: React.FC = () => {
    const {exercises: availableExercises, loading, error: fetchError} = useExercises();
    const {submit, submitting, error: submitError, success} = useWorkoutSubmit();
    const form = useWorkoutForm(availableExercises);

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        const mappedExercises = form.exercises
            .map((ex) => {
                const fullEx = availableExercises.find((e) => e.id === ex.exerciseId);
                if (!fullEx) return null;

                const validSets = ex.sets.filter((s) => s.reps > 0 && s.weight > 0);
                if (validSets.length === 0) return null;

                return {
                    id: fullEx.id,
                    name: fullEx.name,
                    category: fullEx.category,
                    sets: validSets,
                };
            })
            .filter((ex) => ex !== null);

        if (mappedExercises.length === 0) {
            alert("Add at least one exercise with valid sets");
            return;
        }

        submit({name: form.name, date: form.date, exercises: mappedExercises, resetForm: form.resetForm});
    };

    if (loading) return <Loading text="Loading exercises..."/>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg-main text-text-primary w-full">
            <form onSubmit={onFormSubmit} className={styles.formContainer}>
                <h2 className={styles.title}>Log Your Workout</h2>

                {success && <div className={styles.successMessage}>{success}</div>}
                {submitError && <Error messages={[submitError]}/>}
                {fetchError && <Error messages={Array.isArray(fetchError) ? fetchError : [fetchError]}/>}

                <InputField label="Workout Name" value={form.name} onChange={form.setName}/>
                <InputField label="Date & Time" value={form.date} onChange={form.setDate} type="datetime-local"/>

                {form.exercises.map((ex, exIndex) => (
                    <div key={exIndex} className="border-b border-gray-700 py-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold">Exercise {exIndex + 1}</h4>
                            {form.exercises.length > 1 && (
                                <button type="button" className="text-red-500"
                                        onClick={() => form.removeExercise(exIndex)}>
                                    Remove
                                </button>
                            )}
                        </div>

                        <div className="flex gap-2 mt-2">
                            <div className="flex-1">
                                <label className="block text-gray-400 text-sm">Category</label>
                                <select
                                    value={ex.category}
                                    onChange={(e) => form.updateCategory(exIndex, e.target.value)}
                                    className={styles.select}>
                                    <option value="">Select category</option>
                                    {form.categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block text-gray-400 text-sm">Exercise</label>
                                <select
                                    value={ex.exerciseId}
                                    onChange={(e) => form.updateExercise(exIndex, e.target.value)}
                                    className={styles.select}
                                    disabled={!ex.category}>
                                    <option value="">Select exercise</option>
                                    {form.filterExercisesByCategory(ex.category).map((e) => (
                                        <option key={e.id} value={e.id}>{e.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-2">
                            {ex.sets.map((s) => (
                                <SetInput
                                    key={s.id}
                                    id={s.id}
                                    reps={s.reps}
                                    weight={s.weight}
                                    onChange={(_, field, value) => form.updateSet(exIndex, s.id, field, value)}
                                    onRemove={() => form.removeSet(exIndex, s.id)}
                                />
                            ))}

                            <button type="button" className={styles.addButton} onClick={() => form.addSet(exIndex)}>
                                Add Set
                            </button>
                        </div>
                    </div>
                ))}

                <button type="button" className={styles.addButton} onClick={form.addExercise}>
                    Add Exercise
                </button>

                <button type="submit" className={styles.saveButton} disabled={submitting || !!fetchError}>
                    {submitting ? "Saving..." : "Save Workout"}
                </button>
            </form>
        </div>
    );
};

export default LogWorkoutPage;