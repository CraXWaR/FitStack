import {useEffect, useState} from "react";
import type {IWorkout} from "../../types/workout.ts";
import {programService} from "../../services/programService.ts";
import {useAuthContext} from "../../context/AuthContext.tsx";

export function useProgramWorkouts(programId?: string) {
    const {token} = useAuthContext();
    const [workouts, setWorkouts] = useState<IWorkout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<{ messages: string[] } | null>(null);

    useEffect(() => {
        if (!programId || !token) return;

        const loadWorkouts = async () => {
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 1500));
                const data = await programService.getWorkoutsByProgramId(token, programId);

                setWorkouts(data);
            } catch (err: any) {
                setError({messages: err.response?.data?.errors?.map((e: any) => e.message) || ["Failed to fetch workouts"],});
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