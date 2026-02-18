import {useState} from "react";
import type {IAuthResponse, ILoginUser, IRegisterUser} from "../../types/auth.ts";
import {authService} from "../../services/authService.ts";
import {useAuthContext} from "../../context/AuthContext.tsx";
import {useNavigate} from "react-router";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser, setUser} = useAuthContext();
    const navigate = useNavigate();

    const authenticate = async <Payload>(authCall: (data: Payload) => Promise<IAuthResponse>, data: Payload, options?: {
        fetchUser?: boolean;
        redirectToLogin?: boolean
    }) => {
        try {
            setLoading(true);

            //fake delay to show loading state
            await new Promise(timeout => setTimeout(timeout, 1500));
            const result = await authCall(data);

            if (options?.fetchUser) {
                setAuthUser({token: result.token});
                const fullUser = await authService.getUser();
                setUser(fullUser);
            }

            if (options?.redirectToLogin) {
                navigate("/login");
            }

            return result;
        } catch (err: any) {
            throw Array.isArray(err) ? err : [String(err)];
        } finally {
            setLoading(false);
        }
    };

    const login = (data: ILoginUser) => authenticate(authService.login, data, {fetchUser: true});

    const register = (data: IRegisterUser) => authenticate(authService.register, data, {redirectToLogin: true});

    return {login, register, loading};
}