import {useState} from "react";
import {useWorkoutApi} from "./useWorkoutApi";
import type {IExerciseFormItem} from "../../types/exercise.ts";

const formatError = (err: any) => {
    if (Array.isArray(err)) return err.map((e) => (typeof e === "string" ? e : e.message)).join("\n");
    if (err?.errors) return err.errors.map((e: any) => e.message).join("\n");
    if (typeof err === "string") return err;
    if (err?.message) return err.message;
    return "Failed to submit workout";
};

export const useWorkoutSubmit = () => {
    const {createWorkout} = useWorkoutApi();

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const submit = async ({name, date, exercises, resetForm,}: {
        name: string;
        date: string;
        exercises: IExerciseFormItem[];
        resetForm: () => void;
    }) => {
        setSubmitting(true);
        setError("");
        setSuccess("");

        try {
            await createWorkout(name, date, exercises);
            setSuccess("Workout logged successfully");
            resetForm();
        } catch (err) {
            setError(formatError(err));
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
