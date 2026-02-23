import type {ICreateProgram} from "../types/program.ts";
import type {IWorkout} from "../types/workout.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export const programService = {
    async createProgram(token: string, data: ICreateProgram) {
        const res = await fetch(`${BASE_URL}/program/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const err = await res.json();
            throw err.errors?.map((e: any) => e.message) || ["Failed to create program"];
        }

        return res.json();
    },

    async getPrograms(token: string) {
        const res = await fetch(`${BASE_URL}/program/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const err = await res.json();
            throw err.errors?.map((e: any) => e.message) || ["Failed to create program"];
        }

        return res.json();
    },

    async getWorkoutsByProgramId(token: string, programId: string): Promise<IWorkout[]> {
        if (!programId) throw new Error("programId is required");

        const res = await fetch(`${BASE_URL}/program/getProgramWorkouts/${programId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!res.ok) {
            const err = await res.json();
            const messages = err.errors?.map((e: any) => e.message).join(", ") || "Failed to get workouts for this program";
            throw new Error(messages);
        }

        return res.json();
    },

    async getProgramBySlug(token: string, slug: string) {
        const res = await fetch(`${BASE_URL}/program/${slug}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const err = await res.json();
            throw err.errors?.map((e: any) => e.message) || ["Failed to fetch program"];
        }

        return res.json();
    },
};