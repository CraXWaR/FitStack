import type { IExercise } from "./exercise.ts";

export interface IWorkoutSet {
    reps: number;
    weight: number;
}

export interface IWorkoutExercise {
    exerciseId: string;
    sets: IWorkoutSet[];
}

export interface ICreateWorkout {
    name: string;
    date: string;
    exercises: IWorkoutExercise[];
}

export interface IWorkoutFormSubmitArgs {
    name: string;
    date: string;
    exercises: IExercise[];
    resetForm: () => void;
}