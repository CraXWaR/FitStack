import type {IWorkoutExercise} from "../../types/exercise.ts";

export const useLatestSets = (workoutExercise: IWorkoutExercise, newSetIds: Record<string, {
    id: string;
    date: string
}[]>) => {
    const allSets = workoutExercise.sets;
    const todayStr = new Date().toDateString();

    const addedSetRecords = newSetIds[workoutExercise.id] || [];

    const latestAddedSets = allSets.filter(set => addedSetRecords.some(newSet =>
        newSet.id === set.id && new Date(newSet.date).toDateString() === todayStr));
    const nonAddedSets = allSets.filter(set => !latestAddedSets.some(addedSet => addedSet.id === set.id));

    const latestDate = nonAddedSets.reduce((latest, set) => {
        const setDate = new Date(set.createdAt);
        return setDate > latest ? setDate : latest;
    }, new Date(0));

    const latestOriginalSets = nonAddedSets.filter(set =>
        new Date(set.createdAt).toDateString() === latestDate.toDateString());

    return {latestAddedSets, latestOriginalSets};
};