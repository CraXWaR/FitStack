import prisma from "../lib/prisma.js";
import type {ILoginUser, IRegisterUser} from "../types/User.type.js";
import type {User} from "@prisma/index.js";
import bcrypt from "bcrypt";
import type {IUpdateUser} from "../types/UpdateUser.type.js";

export class UserService {
    async register(data: IRegisterUser): Promise<User> {
        const {confirmPassword, ...userData} = data;

        const isExistingUser = await prisma.user.findUnique({
            where: {email: userData.email},
        })

        if (isExistingUser) throw new Error("User already exists");
        if (userData.password !== confirmPassword) throw new Error("Passwords do not match");

        userData.password = await bcrypt.hash(userData.password, 12);

        return prisma.user.create({
            data: userData,
        });
    }

    async login(data: ILoginUser): Promise<User> {
        const {email, password} = data;

        const user = await prisma.user.findUnique({
            where: {email},
        })

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        return user;
    }

    async getUserWithWorkouts(userId: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {id: userId},
            include: {
                profile: true,
                workouts: {
                    orderBy: {date: "asc"},
                    include: {
                        workoutExercises: {
                            include: {
                                exercise: true,
                                sets: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async updateUser(userId: string, data: IUpdateUser) {
        return prisma.user.update({
            where: {id: userId},
            data: {
                firstName: data.firstName,
                ...(data.lastName !== undefined && {lastName: data.lastName}),

                ...(data.profile ? {
                        profile: {
                            upsert: {
                                create: {
                                    weight: data.profile.weight ?? null,
                                    height: data.profile.height ?? null,
                                    age: data.profile.age ?? null,
                                    goal: data.profile.goal ?? null,
                                },
                                update: {
                                    weight: data.profile.weight ?? null,
                                    height: data.profile.height ?? null,
                                    age: data.profile.age ?? null,
                                    goal: data.profile.goal ?? null,
                                },
                            },
                        },
                    }
                    : {}),
            },
            include: {
                profile: true,
                workouts: true
            },
        });
    }

}
