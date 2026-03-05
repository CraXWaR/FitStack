import Groq from "groq-sdk";

interface Set {
    reps: number;
    weight: number;
}

interface IAISuggestion {
    reps: number;
    weight: number;
    reasoning: string;
}

const goalMapping: Record<string, string> = {
    "Lose Weight": "Focus on high reps, low weight, short rest periods",
    "Build Muscle": "Focus on moderate reps (8-12), progressive overload",
    "Improve Endurance": "Focus on high reps (15+), low weight, minimal rest",
    "Increase Strength": "Focus on low reps (3-5), heavy weight, long rest",
    "Tone Body": "Focus on moderate reps (12-15), moderate weight",
    "Improve Flexibility": "Focus on controlled movement, light weight",
    "General Fitness": "Focus on balanced reps (10-12), moderate weight",
    "Rehabilitation / Recovery": "Focus on very light weight, high reps, perfect form",
    "Sports Performance": "Focus on explosive movements, moderate-heavy weight",
    "Maintain Weight": "Focus on moderate reps (10-12), consistent weight",
};

type GoalType = "reduce" | "maintain" | "increase";

const goalTypeMap: Record<string, GoalType> = {
    "Lose Weight": "reduce",
    "Build Muscle": "increase",
    "Improve Endurance": "reduce",
    "Increase Strength": "increase",
    "Tone Body": "maintain",
    "Improve Flexibility": "reduce",
    "General Fitness": "maintain",
    "Rehabilitation / Recovery": "reduce",
    "Sports Performance": "increase",
    "Maintain Weight": "maintain",
};

const getWeightRule = (goal: string, minWeight: number, lastWeight: number): string => {
    const type = goalTypeMap[goal] ?? "maintain";

    if (type === "reduce") return `Weight MUST be between ${minWeight * 0.8}kg and ${minWeight}kg — slightly lighter than last session`;
    if (type === "maintain") return `Weight MUST be between ${minWeight}kg and ${lastWeight}kg — keep it consistent`;
    if (type === "increase") return `Weight MUST be between ${lastWeight}kg and ${lastWeight + 5}kg — small progressive overload`;
    return `Weight MUST be around ${lastWeight}kg`;
};

export class AIService {
    private client: Groq;

    constructor() {
        this.client = new Groq({apiKey: process.env.GROQ_API_KEY});
    }

    async suggestNextSet(exerciseName: string, lastSets: Set[], goal: string): Promise<IAISuggestion> {
        try {
            const setsText = lastSets
                .map((s, i) => `Set ${i + 1}: ${s.reps} reps × ${s.weight}kg`)
                .join("\n");

            const minWeight = Math.min(...lastSets.map(s => s.weight));
            const lastWeight = lastSets[lastSets.length - 1]?.weight ?? minWeight;

            const completion = await this.client.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: `You are a personal trainer AI. Recommend ONE next set based on the user's last sets and goal.
                                  Goal instruction: ${goalMapping[goal] ?? "Focus on balanced progression"}
                                  STRICT RULES:
                                  - ${getWeightRule(goal, minWeight, lastWeight)}
                                  - Weight must be a multiple of 2.5
                                  Respond ONLY with valid JSON: {"reps": number, "weight": number, "reasoning": string}
                                  Keep reasoning under 10 words.`
                    },
                    {
                        role: "user",
                        content: `Exercise: ${exerciseName}\nLast session:\n${setsText}\nLast set was: ${lastWeight}kg`
                    }
                ],
                response_format: {type: "json_object"}
            });

            const text = completion.choices[0]?.message?.content ?? "";
            return JSON.parse(text) as IAISuggestion;
        } catch (error: any) {
            console.error("AIService.suggestNextSet error:", error);
            throw new Error(error.message || "Failed to get AI suggestion");
        }
    }
}