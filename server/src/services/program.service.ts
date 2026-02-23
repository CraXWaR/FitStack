import prisma from "../lib/prisma.js";
import {slugify} from "../../utils/slugify.js";

export class ProgramService {
    async create(userId: string, name: string) {
        return prisma.workoutProgram.create({data: {name, slug: slugify(name), userId}});
    }

    async getAllPrograms(userId: string) {
        return prisma.workoutProgram.findMany({
            where: {userId},
            orderBy: {lastVisited: "desc"},
            select: {
                id: true,
                name: true,
                slug: true,
                _count: {select: {workouts: true}}
            }
        })
    }

    async findBySlug(slug: string) {
        return prisma.workoutProgram.findUnique({
            where: {slug},
            include: {
                workouts: {
                    orderBy: {date: "asc"},
                    include: {
                        workoutExercises: {
                            include: {
                                exercise: true,
                                sets: true
                            }
                        }
                    }
                }
            }
        });
    }

    async getWorkoutsByProgramId(programId: string) {
        await prisma.workoutProgram.update({
            where: {id: programId},
            data: {lastVisited: new Date()}
        });

        return prisma.workout.findMany({
            where: {programId},
            orderBy: {date: "asc"},
            include: {
                workoutExercises: {
                    include: {
                        exercise: true,
                        sets: true,
                    },
                },
            },
        });
    }
}