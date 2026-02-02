import type {ICreateWorkout} from "../types/workout.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export const workoutService = {
    async createWorkout(token: string, data: ICreateWorkout) {
        const res = await fetch(`${BASE_URL}/workout/create`, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               "Authorization": `Bearer ${token}`
           },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.errors?.map((e: any) => e.message).join(", ") || "Failed to create workout");
        }

        return res.json();
    }
};