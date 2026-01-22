import type {User} from "../../prisma/generated/prisma/client.js";

export interface IUser extends User {
    //empty for now will add future fields that are not in DB like fullName(combines first and last name)
}

export interface IRegisterUser extends Omit<User, 'id' | 'createdAt' | 'updatedAt'> {
        confirmPassword: string;
}