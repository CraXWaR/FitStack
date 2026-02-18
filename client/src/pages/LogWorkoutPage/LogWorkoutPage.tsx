import React, {type FormEvent} from "react";

import type {IExerciseFormItem} from "../../types/exercise.ts";

import {useExercises} from "../../hooks/exercises/useExercises.ts";
import {useWorkoutSubmit} from "../../hooks/workout/useWorkoutSubmit";
import {useWorkoutForm} from "../../hooks/workout/useWorkoutForm";
import {usePrograms} from "../../hooks/program/usePrograms.ts";
import {useProgramSubmit} from "../../hooks/program/useProgramSubmit.ts";
import {useAuthContext} from "../../context/AuthContext.tsx";

import InputField from "../../components/Layout/UI/InputField/InputField.tsx";
import Loading from "../../components/Layout/General/Loading/Loading";
import Form from "../../components/Layout/UI/Form/Form";
import Error from "../../components/Layout/General/Error/Error.tsx";
import Button from "../../components/Layout/UI/Button/Button.tsx";
import DateInputField from "../../components/Layout/UI/DateInputField/DateInputField.tsx";
import ExerciseItem from "../../components/LogWorkout/ExerciseItem.tsx";
import ProgramSelector from "../../components/LogWorkout/ProgramSelector.tsx";

import styles from "./LogWorkoutPage.module.css";

const LogWorkoutPage: React.FC = () => {
    const {token} = useAuthContext();
    const {exercises: availableExercises, loading: exercisesLoading, error: fetchError} = useExercises();
    const {submit, submitting, error: submitError, success} = useWorkoutSubmit(token);
    const form = useWorkoutForm(availableExercises);
    const {programs, loading: programsLoading, refetch} = usePrograms();

    const {submit: createProgram, submitting: creatingProgram, error: createProgramError} = useProgramSubmit();

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
            await submit({
                name: form.name,
                date: form.date,
                exercises: mappedExercises,
                programId: form.programId,
                resetForm: form.resetForm,
            });
        } catch (err) {
            console.error("Failed to submit workout:", err);
        }
    };

    if (exercisesLoading) return <Loading text="Loading exercises..."/>;
    if (programsLoading) return <Loading text="Loading Programs..."/>;
    if (fetchError) return <Error messages={fetchError}/>;

    return (
        <>
            <div className={styles.pageWrapper}>
                <Form title="Log Your Workout" submitText={submitting ? "Saving..." : "Save Workout"}
                      onSubmit={onFormSubmit} error={submitError} success={success}>
                    <div className="flex flex-col gap-2">
                        <InputField label="Workout Name" value={form.name} onChange={form.setName}/>
                        <DateInputField form={form}/>
                    </div>

                    <ProgramSelector
                        form={form}
                        programs={programs}
                        loading={programsLoading}
                        token={token}
                        refetch={refetch}
                        createProgram={createProgram}
                        creatingProgram={creatingProgram}
                        createProgramError={createProgramError}
                    />

                    {form.exercises.map((exercise, exerciseIndex) => (
                        <ExerciseItem key={exercise.id} exercise={exercise} index={exerciseIndex} form={form}/>
                    ))}

                    <div className="my-4">
                        <Button variant="primary" onClick={form.addExercise}>
                            Add Exercise
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default LogWorkoutPage;