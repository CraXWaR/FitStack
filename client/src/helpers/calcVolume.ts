import type {ISetResponse} from "../types/exercise.ts";

export const calcVolume = (sets: ISetResponse[]): number =>
    sets.reduce((acc, s) => acc + s.reps * s.weight, 0);