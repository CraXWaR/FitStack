import {z} from "zod";

export const UpdateUserValidateSchema = z.object({
    firstName: z.string().min(4, "First name must be at least 4 characters long"),
    lastName: z.string().min(4, "Last name must be at least 4 characters").nullable().optional(),
    profile: z.object({
        weight: z.number().nullable().optional(),
        height: z.number().nullable().optional(),
        age: z.number().nullable().optional(),
        goal: z.string().nullable().optional(),
    }).optional(),
});
