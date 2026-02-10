export interface IUserResponse {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    profile?: {
        weight?: number;
        height?: number;
        age?: number;
        goal?: string;
    };
    workouts: {
        id: string;
        name: string;
        date: string;
        workoutExercises: {
            id: string;
            exercise: {
                id: string;
                name: string;
                category: string;
            };
            sets: {
                id: string;
                reps: number;
                weight: number;
            }[];
        }[];
    }[];
}