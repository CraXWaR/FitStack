export interface ISet {
    id: string;
    reps: number;
    weight: number;
    createdAt: string;
}

export interface IExercise {
    id: string;
    name: string;
    category: string;
}

export interface IWorkoutExercise {
    id: string;
    exercise: IExercise;
    sets: ISet[];
}

export interface IWorkoutExerciseDisplay {
    id: string;
    exercise: IExercise;
    sets: ISet[];
}

export interface IExerciseFormItem {
    id: string;
    exerciseId: string;
    name: string;
    category: string;
    sets: ISet[];
}