export interface IUpdateUser {
    firstName: string;
    lastName?: string | null;
    profile?: {
        weight?: number | null;
        height?: number | null;
        age?: number | null;
        goal?: string | null;
    };
}