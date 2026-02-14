import {useEffect, useState} from "react";
import {exerciseService} from "../../services/exerciseService.ts";
import type {IExercise} from "../../types/exercise.ts";

export const useExercises = () => {
    const [exercises, setExercises] = useState<IExercise[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string[] | null>(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                setLoading(true);

                // fake delay to show loading state
                await new Promise((resolve) => setTimeout(resolve, 1500));

                const data = await exerciseService.getAll();
                setExercises(data);
                setError(null);
            } catch (err: any) {
                const messages = Array.isArray(err) ? err : [String(err)];
                setError(messages);
                throw err;
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);

    return {exercises, loading, error};
}