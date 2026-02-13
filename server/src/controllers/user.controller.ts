import {UserService} from "../services/user.service.js";
import type {Request, Response, NextFunction} from 'express';
import {LoginValidateSchema, RegisterValidateSchema} from "../validators/user.validator.js";
import jwt from 'jsonwebtoken';
import "dotenv/config";
import {UpdateUserValidateSchema} from "../validators/updateUser.validator.js";
import type {IUpdateUser} from "../types/UpdateUser.type.js";

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

            const accessToken = jwt.sign(payload, process.env.SECRET_KEY!, {
                expiresIn: '1h'
            });

            const {password, ...safeUser} = user;

            return res.status(201).json({
                firstName: safeUser.firstName,
                token: accessToken
            });

        } catch (error: any) {
            return res.status(400).json({
                errors: [{field: "general", message: error.message}]
            });
        }
    }

    public getUserInfo = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            if (!req.user) {
                return res.status(401).json({errors: [{field: "general", message: "Unauthorized"}]});
            }

            const userId = req.user.id;
            const user = await this.userService.getUserWithWorkouts(userId);

            if (!user) {
                return res.status(404).json({errors: [{field: "general", message: "User not found"}]});
            }

            const {password, ...safeUser} = user;
            return res.status(200).json(safeUser);
        } catch (error: any) {
            return res.status(500).json({
                errors: [{field: "general", message: error.message}]
            });
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({errors: [{field: "general", message: "Unauthorized"}]});
            }

            const userId = req.user.id;
            const validation = UpdateUserValidateSchema.safeParse(req.body);

            if (!validation.success) {
                const formattedErrors = validation.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                }));

                return res.status(400).json({errors: formattedErrors});
            }

            const {firstName, lastName, profile} = validation.data;
            const updateData: IUpdateUser = {
                firstName,
                ...(lastName !== undefined && {lastName}),
                ...(profile && {
                    profile: {
                        weight: profile.weight ?? null,
                        height: profile.height ?? null,
                        age: profile.age ?? null,
                        goal: profile.goal ?? null,
                    },
                }),
            };

            const updatedUser = await this.userService.updateUser(userId, updateData);
            const {password, ...safeUser} = updatedUser;

            return res.status(200).json({
                message: "User updated successfully",
                user: safeUser,
            });
        } catch (error: any) {
            return res.status(500).json({
                errors: [{field: "general", message: error.message}],
            });
        }
    };
}