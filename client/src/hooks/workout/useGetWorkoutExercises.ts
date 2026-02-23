import {useEffect, useState} from "react";
import {useParams, useLocation} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext.tsx";

import type {IWorkout} from "../../types/workout.ts";
import type {ISet} from "../../types/exercise.ts";

import {workoutService} from "../../services/workoutService.ts";

export const useGetWorkoutExercises = () => {
    const {token} = useAuthContext();
    const {workoutSlug} = useParams<{ workoutSlug: string }>();
    const location = useLocation();
    const initialWorkout = location.state as IWorkout | undefined;

    const [workout, setWorkout] = useState<IWorkout | null>(initialWorkout ?? null);
    const [loading, setLoading] = useState(!initialWorkout);
    const [error, setError] = useState<string | null>(null);

    const [newSetIds, setNewSetIds] = useState<Record<string, string[]>>({});

    useEffect(() => {
        if (workout || !workoutSlug || !token) return;

        const fetchWorkout = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await workoutService.getWorkoutBySlug(token, workoutSlug);
                setWorkout(data);
            } catch (err: any) {
                setError(err[0] || "Failed to fetch workout");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkout();
    }, [workoutSlug, token, workout]);

    const addSet = (workoutExerciseId: string, reps: number, weight: number) => {
        if (!workout) return;

        const newSet: ISet = {
            id: crypto.randomUUID(),
            reps,
            weight,
            createdAt: new Date().toISOString(),
        };

        setWorkout(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                workoutExercises: prev.workoutExercises.map(workoutExercise =>
                    workoutExercise.id === workoutExerciseId
                        ? {...workoutExercise, sets: [...workoutExercise.sets, newSet]}
                        : workoutExercise
                ),
            };
        });

        setNewSetIds(prev => ({
            ...prev,
            [workoutExerciseId]: [...(prev[workoutExerciseId] || []), newSet.id],
        }));
    };

    return {workout, loading, error, addSet, newSetIds};
};