import type {IExercise} from "../types/exercise.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export const exerciseService = {
    async getAll(): Promise<IExercise[]> {
        const res = await fetch(`${BASE_URL}/exercises/getAll`);

        if (!res.ok) {
            const err = await res.json();
            throw err.errors?.map((e: any) => e.message) || ["Unknown error"];
        }

        return res.json();
    }
}