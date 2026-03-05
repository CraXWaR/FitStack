import type {IAISuggestion} from "../types/ai.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export const aiService = {
    async suggestNextSet(exerciseName: string, lastSets: { reps: number; weight: number }[], goal: string): Promise<IAISuggestion> {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/ai/suggest-set`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include",
            body: JSON.stringify({exerciseName, lastSets, goal})
        });

        if (!res.ok) {
            const err = await res.json();
            throw err.errors?.map((e: any) => e.message) || ["Failed to get AI suggestion"];
        }

        return res.json();
    }
}