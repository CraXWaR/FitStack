import type {IWorkout} from "./workout.ts";
import type {IProfile} from "./profile.ts";

export interface IUserResponse {
    id: string;
    firstName: string;
    lastName?: string | null;
    email: string;
    profile?: IProfile;
    workouts: IWorkout[];
    createdAt?: string;
}

export interface IUpdateUserResponse {
    message: string;
    user: IUserResponse;
}