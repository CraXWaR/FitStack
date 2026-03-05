import {useState} from "react";
import type {IAISuggestion} from "../../types/ai.ts";
import {aiService} from "../../services/aiService.ts";

export const useAISuggest = () => {
    const [suggestion, setSuggestion] = useState<IAISuggestion | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string[] | null>(null);

    const suggest = async (exerciseName: string, lastSets: { reps: number; weight: number }[], goal: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await aiService.suggestNextSet(exerciseName, lastSets, goal);
            setSuggestion(data);
        } catch (err: any) {
            setError(Array.isArray(err) ? err[0] : "Failed to get AI suggestion");
        } finally {
            setLoading(false);
        }
    };

    const clear = () => setSuggestion(null);

    return {suggestion, loading, error, suggest, clear};
};