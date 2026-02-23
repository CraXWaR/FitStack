import {ProgramService} from "../services/program.service.js";
import type {Request, Response} from "express";
import type {IGetProgramWorkoutsParams} from "../types/Program.type.js";

export class ProgramController {
    private programService: ProgramService;

    constructor() {
        this.programService = new ProgramService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const userId = req.user!.id;
            const {name} = req.body;

            if (!name || name.trim().length <= 3) {
                return res.status(400).json({
                    errors: [{
                        field: "name",
                        message: "Program name is required and it has to be at least 4 characters!"
                    }],
                });
            }

            const program = await this.programService.create(userId, name);
            res.status(201).json(program);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                errors: [{
                    field: "general", message: error.message || "Failed to create training program"
                }]
            });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({errors: [{field: "general", message: "Unauthorized"}]});
            }

            const programs = await this.programService.getAllPrograms(userId);
            res.status(202).json(programs);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                errors: [{field: "general", message: error.message || "Failed to get training programs"}]
            });
        }
    };

    getProgramBySlug = async (req: Request, res: Response) => {
        try {
            const {slug} = req.params;
            if (!slug || Array.isArray(slug)) {
                return res.status(400).json({
                    errors: [{field: "general", message: "Invalid program slug"}]
                });
            }

            const program = await this.programService.findBySlug(slug);

            if (!program) {
                return res.status(404).json({
                    errors: [{field: "general", message: "Program not found"}]
                });
            }

            res.status(202).json(program);
        } catch (error: any) {
            console.error("Error fetching program by slug:", error);
            return res.status(500).json({
                errors: [{field: "general", message: error.message || "Internal server error"}]
            });
        }
    }

    getProgramWorkouts = async (req: Request<IGetProgramWorkoutsParams>, res: Response) => {
        try {
            const {programId} = req.params;

            if (!programId) {
                return res.status(400).json({message: "programId is required"});
            }

            const workouts = await this.programService.getWorkoutsByProgramId(programId);
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