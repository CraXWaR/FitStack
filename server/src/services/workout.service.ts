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
                }
            },
            include: {
                workoutExercises: {
                    include: {
                        sets: true,
                        exercise: true,
                    }
                }
            }
        });
    }
}