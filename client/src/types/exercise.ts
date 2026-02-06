export interface IExercise {
    id: string;
    name: string;
    category: string;
    sets: ISets[];
}

export interface ISets {
    id: string;
    reps: number | null;
    weight: number | null;
}

export interface IWorkoutExerciseForm {
    id: string;
    exerciseId: string;
    category: string;
    sets: ISets[];
}