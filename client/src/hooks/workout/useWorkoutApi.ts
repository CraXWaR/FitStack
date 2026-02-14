import {workoutService} from "../../services/workoutService.ts";
import {useAuthContext} from "../../context/AuthContext.tsx";
import type {IExerciseFormItem} from "../../types/exercise.ts";

export const useWorkoutApi = () => {
    const {token} = useAuthContext();

    const createWorkout = async (name: string, date: string, exercises: IExerciseFormItem []) => {
        if (!token) throw new Error("You must be logged in");
        if (exercises.length === 0) throw new Error("Add at least one exercise");

        const payload = exercises.map((exercise) => {
            const validSets = exercise.sets.map((set) => {
                return {reps: set.reps ?? 0, weight: set.weight ?? 0};
            });

            if (validSets.length === 0)
                throw new Error(`Exercise "${exercise.name}" has no sets`);

            return {exerciseId: exercise.exerciseId, sets: validSets};
        });


        return workoutService.createWorkout(token, {name, date, exercises: payload});
    };

    return {createWorkout};
};