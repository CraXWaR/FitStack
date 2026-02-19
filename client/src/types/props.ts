import type { IWorkout } from "./workout.ts";
import type { IProfile } from "./profile.ts";
import type { IWorkoutExerciseDisplay } from "./exercise.ts";

export interface ILastWorkoutProps {
    workout: IWorkout;
}

export interface IStatsProps {
    workouts: IWorkout[];
}

export interface IWorkoutExerciseProps {
    exerciseData: IWorkoutExerciseDisplay;
    isOpen: boolean;
    onToggle: () => void;
}

export interface IUserInfoProps {
    firstName: string;
    lastName?: string | null;
    email: string;
    profile?: IProfile;
}