export interface ICreateWorkout {
    name: string;
    date: string;
    exercises: {
        exerciseId: string;
        sets: { reps: number; weight: number }[];
    }[];
    programId?: string | undefined;
    programOrder: number | null;
}

export interface IProgramWorkoutParams {
    programId?: string;
}