import React, {type FormEvent} from "react";
import styles from "./LogWorkoutPage.module.css";
import InputField from "../../components/Layout/UI/InputField/InputField.tsx";
import {useExercises} from "../../hooks/exercises/useExercises.ts";
import Loading from "../../components/Layout/General/Loading/Loading";
import {useWorkoutSubmit} from "../../hooks/workout/useWorkoutSubmit";
import {useWorkoutForm} from "../../hooks/workout/useWorkoutForm";
import Form from "../../components/Layout/UI/Form/Form";
import Error from "../../components/Layout/General/Error/Error.tsx";
import SelectField from "../../components/Layout/UI/Select/SelectField.tsx";
import Button from "../../components/Layout/UI/Button/Button.tsx";
import {FaPlus, FaTrash} from "react-icons/fa6";
import DateInputField from "../../components/Layout/UI/DateInputField/DateInputField.tsx";
import type {IExerciseFormItem} from "../../types/exercise.ts";

const LogWorkoutPage: React.FC = () => {
    const {exercises: availableExercises, loading, error: fetchError} = useExercises();
    const {submit, submitting, error: submitError, success} = useWorkoutSubmit();
    const form = useWorkoutForm(availableExercises);

    const mapExercises = (exercisesForm: typeof form.exercises, available: typeof availableExercises) => exercisesForm
        .map((exercise) => {
            if (!exercise.exerciseId) return null;

            const fullExercise = available.find((ex) => ex.id === exercise.exerciseId);
            if (!fullExercise) return null;

            return {
                id: exercise.id,
                exerciseId: fullExercise.id,
                name: fullExercise.name,
                category: fullExercise.category,
                sets: exercise.sets,
            };
        }).filter((ex): ex is IExerciseFormItem => ex !== null);

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const mappedExercises = mapExercises(form.exercises, availableExercises);

        try {
            await submit({name: form.name, date: form.date, exercises: mappedExercises, resetForm: form.resetForm,});
        } catch (err) {
            console.error("Failed to submit workout:", err);
        }
    };

    if (loading) return <Loading text="Loading exercises..."/>;
    if (fetchError) return <Error messages={fetchError}/>;

    return (
        <div className={styles.pageWrapper}>
            <Form title="Log Your Workout" submitText={submitting ? "Saving..." : "Save Workout"}
                  onSubmit={onFormSubmit} error={submitError} success={success}>
                <div className="flex flex-col gap-2">
                    <InputField label="Workout Name" value={form.name} onChange={form.setName}/>
                    <DateInputField form={form}/>
                </div>

                {form.exercises.map((exercise, exerciseIndex) => (
                    <div key={exercise.id} className="border-b border-gray-700 py-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold">Exercise {exerciseIndex + 1}</h4>
                            {form.exercises.length > 1 && (
                                <button
                                    type="button"
                                    className="text-red-500 hover:cursor-pointer hover:underline"
                                    onClick={() => form.removeExercise(exerciseIndex)}>
                                    Remove
                                </button>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <SelectField
                                label="Category"
                                value={exercise.category}
                                onChange={(value) => form.updateCategory(exerciseIndex, value)}
                                options={form.categories.map((cat) => ({value: cat, label: cat}))}/>

                            <SelectField
                                label="Exercise"
                                value={exercise.exerciseId}
                                onChange={(value) => form.updateExercise(exerciseIndex, value)}
                                options={form.filterExercisesByCategory(exercise.category).map((ex) => ({
                                    value: ex.id,
                                    label: ex.name,
                                }))} disabled={!exercise.category}/>
                        </div>

                        <div className="flex flex-col gap-2 mt-2">
                            {exercise.sets.map((set) => (
                                <div key={set.id} className="flex gap-2 items-center">
                                    <InputField
                                        label="Reps"
                                        type="number"
                                        value={set.reps ?? ""}
                                        onChange={(value) =>
                                            form.updateSet(
                                                exerciseIndex,
                                                set.id,
                                                "reps",
                                                value === "" ? null : Number(value))}
                                        min={0}
                                        disabled={!exercise.exerciseId}/>

                                    <InputField
                                        label="Weight (kg)"
                                        type="number"
                                        value={set.weight ?? ""}
                                        onChange={(value) =>
                                            form.updateSet(
                                                exerciseIndex,
                                                set.id,
                                                "weight",
                                                value === "" ? null : Number(value))}
                                        min={0}
                                        disabled={!exercise.exerciseId}/>

                                    <div className="flex gap-2 my-2">
                                        <Button variant="outline" onClick={() => form.addSet(exerciseIndex)}>
                                            <FaPlus size={18}/>
                                        </Button>

                                        <Button
                                            variant="remove"
                                            disabled={exercise.sets.length === 1}
                                            onClick={() => form.removeSet(exerciseIndex, set.id)}>
                                            <FaTrash size={18}/>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="my-4">
                    <Button variant="primary" onClick={form.addExercise}>
                        Add Exercise
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LogWorkoutPage;