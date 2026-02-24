import type {IWorkoutExercise} from "../../types/exercise.ts";

export const useLatestSets = (workoutExercise: IWorkoutExercise, newSetIds: Record<string, {
    id: string;
    date: string
}[]>) => {
    const allSets = workoutExercise.sets;

    const latestDate = allSets.reduce((latest, set) => {
        const setDate = new Date(set.createdAt);
        return setDate > latest ? setDate : latest;
    }, new Date(0));

    const latestSets = allSets.filter(
        (set) => new Date(set.createdAt).toDateString() === latestDate.toDateString()
    );

    const todayStr = new Date().toDateString();

    const latestAddedSets = latestSets.filter((set) => newSetIds[workoutExercise.id]?.some(
        (newSet) => newSet.id === set.id && new Date(newSet.date).toDateString() === todayStr));

    const latestOriginalSets = latestSets.filter((set) => !latestAddedSets.includes(set));

    return {latestSets, latestAddedSets, latestOriginalSets};
};