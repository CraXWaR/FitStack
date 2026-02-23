import type {IWorkoutExercise, ISet} from "./exercise";

export interface IWorkout {
    id: string;
    name: string;
    slug: string;
    date: string;
    workoutExercises: IWorkoutExercise[];
    programId?: string;
}

export type IWorkoutSet = Omit<ISet, "id">;

export interface IWorkoutExerciseForm {
    exerciseId: string;
    sets: IWorkoutSet[];
}

export interface ICreateWorkout {
    name: string;
    date: string;
    exercises: IWorkoutExerciseForm[];
    programId?: string;
}