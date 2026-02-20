import {useEffect, useState} from "react";
import type {IWorkout} from "../../types/workout.ts";
import {workoutService} from "../../services/workoutService.ts";
import {useAuthContext} from "../../context/AuthContext.tsx";

export function useProgramWorkouts(programId?: string) {
    const {token} = useAuthContext();
    const [workouts, setWorkouts] = useState<IWorkout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!programId || !token) return;

        const loadWorkouts = async () => {
            try {
                setLoading(true);

                await new Promise((resolve) => setTimeout(resolve, 1500));

                const data = await workoutService.getWorkoutsByProgramId(token, programId);
                setWorkouts(data);
            } catch (err: any) {
                setError(err.message || "Error fetching workouts");
            } finally {
                setLoading(false);
            }
        };

        loadWorkouts();
    }, [programId, token]);

    const getExerciseCount = (workout: IWorkout) => workout.workoutExercises.length;

    const getWorkoutExercise = (workout: IWorkout) =>
        Array.from(new Set(workout.workoutExercises.map((workoutExercise) => workoutExercise.exercise.name)));

    return {workouts, loading, error, getExerciseCount, getWorkoutExercise};
}