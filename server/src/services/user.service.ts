import prisma from "../lib/prisma.js";
import type { IRegisterUser } from "../types/User.type.js";
import type {User} from "@prisma/index.js";

export class UserService {
    async register(data: IRegisterUser): Promise<User> {
        const { confirmPassword, ...userData } = data;

        return prisma.user.create({
            data: userData,
        });
    }
}
