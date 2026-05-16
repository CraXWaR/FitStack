import {workoutService} from "../../services/workoutService.ts";
import type {IExerciseFormItem} from "../../types/exercise.ts";

export const createWorkout = async (token: string | null, name: string, date: string, exercises: IExerciseFormItem[], programId?: string) => {
    if (!token) throw new Error("You must be logged in");

    const payload = exercises.map((exercise) => {
        const validSets = exercise.sets.map((set) => {
            if (set.reps === "") {
                throw [`Exercise "${exercise.name}" has empty sets - fill in all reps and weights`];
            }
            return {
                reps: parseFloat(set.reps),
                weight: parseFloat(set.weight),
            };
        });

        if (validSets.length === 0)
            throw new Error(`Exercise "${exercise.name}" has no sets`);

        return { exerciseId: exercise.exerciseId, sets: validSets };

    });


    return workoutService.createWorkout(token, {
        name,
        date,
        exercises: payload,
        ...(programId ? { programId } : {}),
    });
};
