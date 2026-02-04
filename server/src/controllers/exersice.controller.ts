import {ExerciseService} from "../services/exersice.service.js";
import type {Request, Response} from "express";

export class ExerciseController {
    private exerciseService: ExerciseService;

    constructor() {
        this.exerciseService = new ExerciseService();
    }

    getAll = async (_req: Request, res: Response) => {
        try {
            const exercises = await this.exerciseService.getAllExercises();
            return res.status(200).json(exercises);
        } catch (error: any) {
            return res.status(500).json({
                errors: [{field: "general", message: error.message || "Failed to fetch exercises"}]
            });
        }
    }
}