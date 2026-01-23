import type {User} from "../../prisma/generated/prisma/client.js";

export interface IUser extends User {
    //empty for now will add future fields that are not in DB like fullName(combines first and last name)
}

export interface IRegisterUser {
        firstName: string,
        email: string,
        password: string,
        confirmPassword: string;
}

export interface ILoginUser {
        email: string;
        password: string;
}