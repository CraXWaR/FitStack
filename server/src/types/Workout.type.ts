export interface ICreateWorkout {
    name: string;
    date: string;
    exercises: {
        exerciseId: string;
        sets: { reps: number; weight: number }[];
    }[];
}