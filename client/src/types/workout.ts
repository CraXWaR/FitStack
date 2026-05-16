import type {IWorkoutExercise} from "./exercise";

export interface IWorkout {
    id: string;
    name: string;
    slug: string;
    date: string;
    workoutExercises: IWorkoutExercise[];
    programId?: string;
}

export interface IWorkoutExerciseForm {
    exerciseId: string;
    sets: { reps: number; weight: number }[];
}

export interface ICreateWorkout {
    name: string;
    date: string;
    exercises: IWorkoutExerciseForm[];
    programId?: string;
}