import {UserService} from "../services/user.service.js";
import type {Request, Response, NextFunction} from 'express';
import bcrypt from "bcrypt";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        //TODO check if existing user

        try {
            const { firstName, lastName, email, password, confirmPassword } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await this.userService.register({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                confirmPassword
            });

            res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            })

        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}