import {z} from "zod";

export const CreateWorkoutSchema = z.object({
    name: z
        .string()
        .min(3, "Workout name must be at least 3 characters long"),

    date: z
        .string()
        .min(1, "Workout date is required")
        .refine((val) => !isNaN(new Date(val).getTime()), {
            message: "Invalid date format",
        }),

    exercises: z
        .array(
            z.object({
                exerciseId: z.string().min(1, "Select Exercise"),
                sets: z
                    .array(
                        z.object({
                            reps: z.number().min(0, "Reps cannot be negative"),
                            weight: z.number().min(0, "Weight cannot be negative"),
                        })
                    )
                    .min(1, "At least one set is required"),
            })
        )
        .min(1, "At least one exercise is required"),

    programId: z.string().uuid().optional()
});
