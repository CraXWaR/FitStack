import type {IWorkoutExerciseDisplay} from "./exercise";

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
    exercises: IWorkoutExerciseForm[]
    programId?: string;
}

export interface IWorkout {
    id: string;
    name: string;
    date: string;
    workoutExercises: IWorkoutExerciseDisplay[];
}