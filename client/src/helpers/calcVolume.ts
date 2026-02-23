import type {ISet} from "../types/exercise.ts";

export const calcVolume = (sets: ISet[]): number =>
    sets.reduce((acc, s) => acc + s.reps * s.weight, 0);