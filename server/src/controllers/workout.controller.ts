import {WorkoutService} from "../services/workout.service.js";
import type {Request, Response} from "express";
import type {ICreateWorkout} from "../types/Workout.type.js";

export class WorkoutController {
    private workoutService: WorkoutService;

    constructor() {
        this.workoutService = new WorkoutService();
    }

    create = async (req: Request, res: Response) => {
        console.log(req.user)
        try {
            const userId = req.user!.id;
            const data: ICreateWorkout = req.body

            if (!data.date) {
                return res.status(400).json({message: "Workout date is required!"});
            }

            const workout = await this.workoutService.create(userId, data);
            return res.status(201).json(workout);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({message: error.message || "Failed to create workout"});
        }
    }
}