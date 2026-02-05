export interface IExercise {
    id: string;
    name: string;
    category: string;
    sets: ISets[];
}

export interface ISets {
    id: string;
    reps: number;
    weight: number;
}

export interface IWorkoutExerciseForm {
    id: string;
    exerciseId: string;
    category: string;
    sets: ISets[];
}

export interface IWorkoutExerciseSetProps {
    id: string;
    reps: number;
    weight: number;
    onChange: (index: string, field: "reps" | "weight", value: number) => void;
    onRemove: () => void;
}