import prisma from "../lib/prisma.js";

export class SetService {
    async addSet(userId: string, workoutExerciseId: string, data: { reps: number; weight: number }) {
        const newSet = await prisma.set.create({
            data: {
                reps: data.reps,
                weight: data.weight,
                workoutExercise: {connect: {id: workoutExerciseId}},
            },
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        await prisma.todayAddedSet.create({
            data: {
                setId: newSet.id,
                userId,
                workoutExerciseId,
                date: today,
            },
        });

        return {set: newSet, todayAdded: true};
    }

    async getTodayAddedSets(userId: string, workoutExerciseIds: string[]) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayAdded = await prisma.todayAddedSet.findMany({
            where: {
                userId,
                workoutExerciseId: {in: workoutExerciseIds},
                date: today,
            },
        });

        return todayAdded.reduce((accumulator, item) => {
            const exerciseId = item.workoutExerciseId;
            const setId = item.setId;

            if (!exerciseId || !setId) return accumulator;

            if (!accumulator[exerciseId]) accumulator[exerciseId] = [];
            accumulator[exerciseId].push(setId);

            return accumulator;
        }, {} as Record<string, string[]>);
    }
}