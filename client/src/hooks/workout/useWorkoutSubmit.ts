import {useState} from "react";
import {useWorkoutApi} from "./useWorkoutApi";
import type {IExerciseFormItem} from "../../types/exercise.ts";

export const useWorkoutSubmit = () => {
    const {createWorkout} = useWorkoutApi();

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string[]>([]);
    const [success, setSuccess] = useState("");

    const submit = async ({name, date, exercises, resetForm,}: {
        name: string;
        date: string;
        exercises: IExerciseFormItem[];
        resetForm: () => void;
    }) => {
        setSubmitting(true);
        setError([]);
        setSuccess("");

        try {
            await createWorkout(name, date, exercises);
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
