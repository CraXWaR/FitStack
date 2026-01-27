import {UserService} from "../services/user.service.js";
import type {Request, Response, NextFunction} from 'express';
import {LoginValidateSchema, RegisterValidateSchema} from "../validators/user.validator.js";
import jwt from 'jsonwebtoken';
import "dotenv/config";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const validateUserInput = RegisterValidateSchema.safeParse(req.body);
            if (!validateUserInput.success) {
                const formattedErrors = validateUserInput.error.issues.map(issue => ({
                    field: issue.path[0],
                    message: issue.message
                }));

                return res.status(400).json({errors: formattedErrors});
            }

            const validatedData = validateUserInput.data;
            const user = await this.userService.register(validatedData);
            const {password, ...safeUser} = user;

            return res.status(201).json({
                message: "User registered successfully",
                user: safeUser,
            })

        } catch (error: any) {
            return res.status(400).json({
                errors: [{field: "general", message: error.message}]
            });
        }

    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const validateUserInput = LoginValidateSchema.safeParse(req.body);
            if (!validateUserInput.success) {
                const formattedErrors = validateUserInput.error.issues.map(issue => ({
                    field: issue.path[0],
                    message: issue.message
                }));

                return res.status(400).json({errors: formattedErrors});
            }

            const user = await this.userService.login(req.body);
            const payload = {id: user.id, email: user.email, firstName: user.firstName};

            if (!process.env.SECRET_KEY) {
                throw new Error("JWT secret key not set in environment");
            }

            const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'});
            const {password, ...safeUser} = user;

            return res.status(201).json({
                message: "User logged in successfully",
                firstName: safeUser.firstName,
                token
            });

        } catch (error: any) {
            return res.status(400).json({
                errors: [{field: "general", message: error.message}]
            });
        }
    }
}