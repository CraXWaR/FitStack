import {WorkoutService} from "../services/workout.service.js";
import type {Request, Response} from "express";
import {CreateWorkoutSchema} from "../validators/workout.validator.js";
import type {ICreateWorkout, IProgramWorkoutParams} from "../types/Workout.type.js";

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
                const lastWorkout = await this.workoutService.getLastWorkoutByProgram(data.programId);
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

    getProgramWorkouts = async (req: Request<IProgramWorkoutParams>, res: Response) => {
        try {
            const {programId} = req.params;

            if (!programId) {
                return res.status(400).json({message: "programId is required"});
            }

            const workouts = await this.workoutService.getWorkoutsByProgramId(programId);
            return res.status(200).json(workouts);

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
}