export interface IUpdateUser {
    firstName: string;
    lastName?: string;
    profile?: {
        weight?: number | null;
        height?: number | null;
        age?: number | null;
        goal?: string | null;
    };
}