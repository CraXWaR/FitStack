import type { IExercise, IWorkoutExerciseDisplay } from "./exercise";

export interface IWorkoutSet {
    reps: number;
    weight: number;
}

export interface IWorkoutExerciseForm {
    exerciseId: string;
    sets: IWorkoutSet[];
}

export interface ICreateWorkout {
    name: string;
    date: string;
    exercises: IWorkoutExerciseForm[];
}

export interface IWorkoutFormSubmitArgs {
    name: string;
    date: string;
    exercises: IExercise[];
    resetForm: () => void;
}

export interface IWorkout {
    id: string;
    name: string;
    date: string;
    workoutExercises: IWorkoutExerciseDisplay[];
}