import type {ICreateWorkout, IWorkout} from "../types/workout.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export const workoutService = {
    async createWorkout(token: string | null, data: ICreateWorkout) {
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
            throw err.errors?.map((e: any) => e.message) || ["Failed to create workout"];
        }

        return res.json();
    },

    async getWorkoutBySlug(token: string, slug: string): Promise<IWorkout> {
        const res = await fetch(`${BASE_URL}/workout/${slug}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({errors: []}));
            console.log(err)
            throw err.errors?.map((e: any) => e.message) || ["Failed to fetch workout"];
        }

        return res.json();
    },
};