import {SetService} from "../services/set.service.js";
import type {Request, Response} from 'express';

export class SetController {
    private setService: SetService;

    constructor() {
        this.setService = new SetService();
    }

    addSet = async (req: Request<{ workoutExerciseId: string }, any, {
        reps: number;
        weight: number
    }>, res: Response) => {
        const {workoutExerciseId} = req.params;
        const {reps, weight} = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                errors: [{field: "userId", message: "Unauthorized"}],
            });
        }
        if (!workoutExerciseId) {
            return res.status(400).json({
                errors: [{field: "workoutExerciseId", message: "Missing workoutExerciseId"}],
            });
        }
        if (reps == null || weight == null) {
            return res.status(400).json({
                errors: [{field: "set", message: "Missing reps or weight"}],
            });
        }

        try {
            const data = await this.setService.addSet(userId, workoutExerciseId, {reps, weight});
            return res.json(data);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                errors: [{field: "unknown", message: "Failed to add set"}],
            });
        }
    };

    getTodayAddedSets = async (req: Request, res: Response) => {
        const userId = req.user?.id;
        const exerciseIdsParam = req.query.exerciseIds as string;

        if (!userId) {
            return res.status(401).json({errors: [{field: "userId", message: "Unauthorized"}]});
        }
        if (!exerciseIdsParam) {
            return res.status(400).json({errors: [{field: "exerciseIds", message: "Missing exerciseIds"}]});
        }

        const workoutExerciseIds = exerciseIdsParam.split(",");

        try {
            const data = await this.setService.getTodayAddedSets(userId, workoutExerciseIds);
            return res.json(data);
        } catch (err) {
            console.error("Error fetching today's sets:", err);
            return res.status(500).json({errors: [{field: "unknown", message: "Failed to get today added sets"}]});
        }
    };
}