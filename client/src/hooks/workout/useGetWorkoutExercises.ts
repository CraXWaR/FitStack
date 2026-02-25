import {useEffect, useState, useCallback} from "react";
import {useParams, useLocation} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext.tsx";

import type {IWorkout} from "../../types/workout.ts";

import {workoutService} from "../../services/workoutService.ts";
import {setService, type NewSetRecord} from "../../services/setService.ts";

export const useGetWorkoutExercises = () => {
    const {token} = useAuthContext();
    const {workoutSlug} = useParams<{ workoutSlug: string }>();
    const location = useLocation();
    const initialWorkout = location.state as IWorkout | undefined;

    const [workout, setWorkout] = useState<IWorkout | null>(initialWorkout ?? null);
    const [loading, setLoading] = useState(!initialWorkout);
    const [error, setError] = useState<{ messages?: string[] } | null>(null);
    const [newSetIds, setNewSetIds] = useState<NewSetRecord>({});

    const getTodayStr = () => new Date().toISOString().split("T")[0];

    useEffect(() => {
        if (!workoutSlug || !token) return;

        const fetchWorkout = async () => {
            try {
                const data = await workoutService.getWorkoutBySlug(token, workoutSlug);
                setWorkout(data);
            } catch (err: any) {
                setError({messages: err.response?.data?.errors?.map((e: any) => e.message) || ["Failed to fetch workout"],});
            } finally {
                if (!initialWorkout) setLoading(false);
            }
        };

        fetchWorkout();
    }, [workoutSlug, token]);

    useEffect(() => {
        if (!workout || !token) return;

        const fetchSets = async () => {
            const exerciseIds = workout.workoutExercises.map(workoutExercise => workoutExercise.id);
            if (exerciseIds.length === 0) return;

            try {
                const todaySets = await setService.fetchTodayAddedSets(token, exerciseIds);
                setNewSetIds(todaySets);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSets();
    }, [workout, token]);

    const addSet = useCallback(async (workoutExerciseId: string, reps: number, weight: number) => {
            if (!workout || !token) return;

            try {
                const created = await setService.addSet(token, workoutExerciseId, reps, weight);

                setWorkout(prev => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        workoutExercises: prev.workoutExercises.map(workoutExercise =>
                            workoutExercise.id === workoutExerciseId
                                ? {...workoutExercise, sets: [...workoutExercise.sets, created.set]}
                                : workoutExercise
                        ),
                    };
                });

                if (created.todayAdded) {
                    const todayStr = getTodayStr();
                    setNewSetIds(prev => ({
                        ...prev,
                        [workoutExerciseId]: [
                            ...(prev[workoutExerciseId] || []),
                            {id: created.set.id, date: todayStr},
                        ],
                    }));
                }
            } catch (err: any) {
                console.error(err);
                setError(err)
            }
        },
        [workout, token]
    );

    return {workout, loading, error, addSet, newSetIds};
};