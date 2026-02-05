import { useState } from "react";
import { useWorkoutApi } from "./useWorkoutApi";
import type { IWorkoutFormSubmitArgs } from "../../types/workout.ts";

export const useWorkoutSubmit = () => {
    const { createWorkout } = useWorkoutApi();

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const submit = async ({ name, date, exercises, resetForm }: IWorkoutFormSubmitArgs) => {
        setSubmitting(true);
        setError("");
        setSuccess("");

        try {
            await createWorkout(name, date, exercises);
            setSuccess("Workout logged successfully");
            resetForm();
        } catch (err: any) {
            setError(err.message || "Failed to save workout");
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