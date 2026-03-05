import type {Request, Response} from 'express';
import {AIService} from "../services/ai.service.js";

export class AIController {
    private aiService: AIService;

    constructor() {
        this.aiService = new AIService();
    }

    suggestSet = async (req: Request, res: Response) => {
        const {exerciseName, lastSets, goal} = req.body;

        if (!exerciseName || !lastSets?.length || !goal) {
            return res.status(400).json({
                errors: [{field: "general", message: "Missing required fields"}]
            });
        }

        try {
            const suggestion = await this.aiService.suggestNextSet(exerciseName, lastSets, goal);
            return res.status(200).json(suggestion);
        } catch (error: any) {
            return res.status(500).json({
                errors: [{field: "general", message: error.message || "Failed to get AI suggestion"}]
            });
        }
    }
}