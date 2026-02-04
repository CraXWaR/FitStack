import type {IExercise} from "../types/Exercise.js";
import prisma from "../lib/prisma.js";

export class ExerciseService {
    async getAllExercises(): Promise<IExercise[]> {
        try {
            const exercises = await prisma.exercise.findMany({
                select: {
                    id: true,
                    name: true,
                    category: true,
                },
            });

            if (!exercises || exercises.length === 0) {
                throw new Error("No exercises found");
            }

            return exercises;
        } catch (error: any) {
            console.error("ExerciseService.getAllExercises error:", error);
            throw new Error(error.message || "Failed to fetch exercises");
        }
    }
}