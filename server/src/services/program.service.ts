import prisma from "../lib/prisma.js";

export class ProgramService {
    async create(userId: string, name: string) {
        return prisma.workoutProgram.create({data: {name, userId}});
    }
}