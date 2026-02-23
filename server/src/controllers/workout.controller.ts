import {WorkoutService} from "../services/workout.service.js";
import type {Request, Response} from "express";
import {CreateWorkoutSchema} from "../validators/workout.validator.js";
import type {ICreateWorkout} from "../types/Workout.type.js";

export class WorkoutController {
    private workoutService: WorkoutService;

    constructor() {
        this.workoutService = new WorkoutService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const userId = req.user!.id;
            const parsed = CreateWorkoutSchema.safeParse(req.body);

            if (!parsed.success) {
                const errors = parsed.error.issues.map(issue => ({
                    field: issue.path.join("."),
                    message: issue.message
                }));

                return res.status(400).json({errors});
            }

            const data: ICreateWorkout = parsed.data as ICreateWorkout;
            let programOrder: number | null = null;

            if (data.programId) {
                const lastWorkout = await this.workoutService.getLastWorkoutByProgramId(data.programId);
                programOrder = lastWorkout?.programOrder != null ? lastWorkout.programOrder + 1 : 1;
            } else {
                programOrder = null;
            }
            const workoutToCreate: ICreateWorkout = {...data, programOrder};
            const workout = await this.workoutService.create(userId, workoutToCreate);

            return res.status(201).json(workout);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                errors: [{
                    field: "general",
                    message: error.message || "Failed to create workout"
                }]
            });
        }
    }

    getWorkoutBySlug = async (req: Request, res: Response) => {
        try {
            let {workoutSlug} = req.params;

            if (!workoutSlug || (Array.isArray(workoutSlug) && (workoutSlug = workoutSlug[0]) === undefined)) {
                return res.status(400).json({
                    errors: [{ field: "general", message: "Missing workout slug" }],
                });
            }

            const workout = await this.workoutService.findWorkoutBySlug(workoutSlug);
            console.log(workoutSlug);
            if (!workout) {
                return res.status(404).json({
                    errors: [{field: "general", message: "Workout not found"}],
                });
            }

            if (!workout) {
                return res.status(404).json({
                    errors: [{field: "general", message: "Workout not found"}]
                });
            }

            return res.json(workout);
        } catch (err: any) {
            console.error("Error fetching workout:", err);
            return res.status(500).json({
                errors: [{field: "general", message: err.message || "Internal server error"}]
            });
        }
    };
}