import type {ICreateWorkout} from "../types/Workout.type.js";
import prisma from "../lib/prisma.js";

export class WorkoutService {
    async create(userId: string, data: ICreateWorkout) {
        return prisma.workout.create({
            data: {
                name: data.name,
                date: new Date(data.date),
                user: {connect: {id: userId}},
                workoutExercises: {
                    create: data.exercises.map(exercise => ({
                        exerciseId: exercise.exerciseId,
                        sets: {create: exercise.sets}
                    }))
                },
                ...(data.programId && {program: {connect: {id: data.programId}}}),
                programOrder: data.programOrder,
            },
            include: {
                workoutExercises: {
                    include: {
                        sets: true,
                        exercise: true,
                    }
                },
                program: true
            }
        });
    }

    async getLastWorkoutByProgram(programId: string) {
        return prisma.workout.findFirst({
            where: {
                programId,
                programOrder: {not: null},
            },
            orderBy: {programOrder: 'desc'},
        });
    }

    async getWorkoutsByProgramId(programId: string) {
        return prisma.workout.findMany({
            where: { programId },
            orderBy: { date: "asc" },
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