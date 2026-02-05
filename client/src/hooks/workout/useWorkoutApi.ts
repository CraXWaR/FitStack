import {workoutService} from "../../services/workoutService.ts";
import {useAuthContext} from "../../context/AuthContext.tsx";
import type {IExercise} from "../../types/exercise.ts";

export const useWorkoutApi = () => {
    const {token} = useAuthContext();

    const createWorkout = async (name: string, date: string, exercises: IExercise[]) => {
        if (!token) throw new Error("You must be logged in");
        if (exercises.length === 0) throw new Error("Add at least one exercise");

        const payload = exercises.map((ex) => {
            if (!ex.id || ex.sets.length === 0)
                throw new Error(`Exercise "${ex.name}" has no sets`);

            const validSets = ex.sets
                .filter((s) => s.reps > 0 && s.weight > 0)
                .map((s) => ({reps: Number(s.reps), weight: Number(s.weight)}));

            if (validSets.length === 0)
                throw new Error(`Exercise "${ex.name}" has no valid sets`);

            return {exerciseId: ex.id, sets: validSets};
        });

        return workoutService.createWorkout(token, {name, date, exercises: payload});
    };

    return {createWorkout};
};