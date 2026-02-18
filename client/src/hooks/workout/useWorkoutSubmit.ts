import {useState} from "react";
import type {IExerciseFormItem} from "../../types/exercise.ts";
import {createWorkout} from "./useWorkoutApi.ts";

export const useWorkoutSubmit = (token: string | null) => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string[] | null>(null);
    const [success, setSuccess] = useState("");

    const submit = async ({name, date, exercises, programId, resetForm}: {
        name: string;
        date: string;
        exercises: IExerciseFormItem[];
        programId?: string;
        resetForm: () => void;
    }) => {
        setSubmitting(true);
        setError(null);
        setSuccess("");

        try {
            await createWorkout(token, name, date, exercises, programId);
            setSuccess("Workout logged successfully");
            resetForm();
        } catch (err) {
            setError(Array.isArray(err) ? err : ["Failed to submit workout"]);
        } finally {
            setSubmitting(false);
        }
    };

    return {
        submit,
        submitting,
        error,
        success,
        clearSuccess: () => setSuccess(""),
    };
};
