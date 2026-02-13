import {useState} from "react";
import type {IAuthResponse, ILoginUser, IRegisterUser} from "../types/auth.ts";
import {authService} from "../services/authService.ts";
import {useAuthContext} from "../context/AuthContext.tsx";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const authenticate = async <Payload>(authCall: (data: Payload) => Promise<IAuthResponse>, data: Payload) => {
        try {
            setLoading(true);

            //fake delay to show loading state
            await new Promise(timeout => setTimeout(timeout, 1500));
            const result = await authCall(data);

            setAuthUser({token: result.token});

            return result;
        } catch (err: any) {
            throw Array.isArray(err) ? err : [String(err)];
        } finally {
            setLoading(false);
        }
    };

    const login = (data: ILoginUser) => authenticate(authService.login, data);
    const register = (data: IRegisterUser) => authenticate(authService.register, data);

    return {login, register, loading};
}