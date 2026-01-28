import {useState} from "react";
import type {IAuthResponse, ILoginUser, IRegisterUser} from "../types/auth.tsx";
import {authService} from "../services/authService.ts";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string[] | null>(null);

    const authenticate = async <Payload>(authCall: (data: Payload) => Promise<IAuthResponse>, data: Payload) => {
        try {
            setLoading(true);
            setError(null);

            //fake delay to show loading state
            await new Promise(timeout => setTimeout(timeout, 1500));
            const result = await authCall(data);

            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("firstName", result.firstName);

            return result;
        } catch (err: any) {
            const messages = Array.isArray(err) ? err : [String(err)];
            setError(messages);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const login = (data: ILoginUser) => authenticate(authService.login, data);
    const register = (data: IRegisterUser) => authenticate(authService.register, data);

    return {login, register, loading, error};
}