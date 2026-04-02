import {z} from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const RegisterValidateSchema = z.object({
    firstName: z
        .string()
        .min(4, "First name must be at least 4 characters long"),

    email: z
        .string()
        .email("Invalid email address"),

    password: z
        .string()
        .regex(
            passwordRegex,
            "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character"
        ),

    confirmPassword: z
        .string()
        .min(1, "Password doesn't match"),
});