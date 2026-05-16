export interface ISet {
    id: string;
    reps: string;
    weight: string;
    createdAt?: string;
}

export interface ISetResponse {
    id: string;
    reps: number;
    weight: number;
    createdAt?: string;
}

export interface IExercise {
    id: string;
    name: string;
    category: string;
}

export interface IWorkoutExercise {
    id: string;
    exercise: IExercise;
    sets: ISetResponse[];
}

export interface IExerciseFormItem {
    id: string;
    exerciseId: string;
    name: string;
    category: string;
    sets: ISet[];
}