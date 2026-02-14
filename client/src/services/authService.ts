import type {IAuthResponse, ILoginUser, IRegisterUser} from "../types/auth.ts";
import type {IUserResponse, IUpdateUserResponse} from "../types/user.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export const authService = {
        async login(data: ILoginUser): Promise<IAuthResponse> {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include"
            });

            if (!res.ok) {
                const err = await res.json();
                throw err.errors?.map((e: any) => e.message) || ["Login failed"];
            }

            return res.json();
        },

    async register(data: IRegisterUser): Promise<IAuthResponse> {
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include"
        });

        if (!res.ok) {
            const err = await res.json();
            throw err.errors?.map((e: any) => e.message) || ["Registration failed"];
        }

        return res.json();
    },

    async getUser(): Promise<IUserResponse> {
        let token = sessionStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/auth/me`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include"
        });

        if (!res.ok) {
            const err = await res.json();
            throw err.errors?.map((e: any) => e.message) || ["Failed to fetch user"];
        }

        return res.json();
    },

    async updateUser(token: string, data: any): Promise<IUpdateUserResponse> {
        const res = await fetch(`${BASE_URL}/auth/me/update`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const err = await res.json();
            throw err.errors?.map((e: any) => e.message) || ["Failed to update user"];
        }

        return await res.json() as Promise<IUpdateUserResponse>;
    }
}