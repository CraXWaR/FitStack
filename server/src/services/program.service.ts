import prisma from "../lib/prisma.js";

export class ProgramService {
    async create(userId: string, name: string) {
        return prisma.workoutProgram.create({data: {name, userId}});
    }

    async getAllPrograms(userId: string) {
        return prisma.workoutProgram.findMany({
            where: {userId},
            orderBy: {lastVisited: "desc"},
            select: {
                id: true,
                name: true,
                _count: {select: {workouts: true}}
            }
        })
    }
}