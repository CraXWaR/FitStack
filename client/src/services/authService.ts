import type {IAuthResponse, ILoginUser, IRegisterUser} from "../types/auth.tsx";

const BASE_URL = import.meta.env.VITE_API_URL;

export const authService = {
    async login(data: ILoginUser): Promise<IAuthResponse> {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
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
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const err = await res.json();
            throw err.errors?.map((e: any) => e.message) || ["Registration failed"];
        }

        return res.json();
    }
}