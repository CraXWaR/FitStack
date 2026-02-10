export interface ISets {
    id: string;
    reps: number | null;
    weight: number | null;
}

export interface IExercise {
    id: string;
    name: string;
    category: string;
}

export interface IWorkoutExercise {
    id: string;
    exercise: IExercise;
    sets: ISets[];
}

export interface IWorkoutExerciseForm {
    id: string;
    exerciseId: string;
    category: string;
    sets: ISets[];
}

export interface IWorkout {
    id: string;
    name: string;
    date: string;
    workoutExercises: IWorkoutExercise[];
}