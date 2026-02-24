import type {ISet} from "../types/exercise.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export type NewSetRecord = Record<string, { id: string; date: string }[]>;

export const setService = {
    async addSet(token: string, workoutExerciseId: string, reps: number, weight: number): Promise<{ set: ISet; todayAdded: boolean }> {
        if (!token) throw new Error("Token is required");
        if (!workoutExerciseId) throw new Error("workoutExerciseId is required");

        const res = await fetch(`${BASE_URL}/set/${workoutExerciseId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({reps, weight}),
        });

        if (!res.ok) {
            const err = await res.json();
            throw err.errors?.map((e: any) => e.message) || ["Failed to add set"];
        }

        return res.json();
    },

    async fetchTodayAddedSets(token: string, exerciseIds: string[]): Promise<NewSetRecord> {
        if (exerciseIds.length === 0) return {};

        const params = new URLSearchParams();
        params.append("exerciseIds", exerciseIds.join(","));

        const res = await fetch(`${BASE_URL}/set/today?${params.toString()}`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        if (!res.ok) {
            const err = await res.json();
            throw err.errors?.map((e: any) => e.message) || ["Failed to fetch today added sets"];
        }

        const data: Record<string, string[]> = await res.json();
        const todayStr = new Date().toISOString().split("T")[0];

        const mapped: NewSetRecord = {};
        Object.entries(data).forEach(([exerciseId, setIds]) => {
            mapped[exerciseId] = setIds.map((id) => ({id, date: todayStr}));
        });

        return mapped;
    },
};