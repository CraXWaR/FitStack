import React, {useState} from "react";
import AuthForm from "../../components/AuthForm/AuthForm.tsx";
import type {ILoginUser} from "../../types/auth.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router";
import {useAuthContext} from "../../context/AuthContext.tsx";
import Loading from "../../components/Layout/General/Loading/Loading.tsx";
import Error from "../../components/Layout/General/Error/Error.tsx";

const LoginPage: React.FC = () => {
    const [showError, setShowError] = useState(true);

    const {login, loading, error} = useAuth();
    const {setAuthUser} = useAuthContext();
    const navigate = useNavigate();
    const handleLogin = async (data: ILoginUser) => {
        const result = await login(data);
        setAuthUser({token: result.token, firstName: result.firstName});
        navigate("/");
    }

    if (loading) return <Loading />;
    if (error && showError) return <Error messages={error} actionText="Try again" onAction={() => setShowError(false)} />;

    return (
        <AuthForm<ILoginUser>
            title="Log in"
            submitText="Log in"
            onSubmit={handleLogin}
            fields={[
                {name: "email", label: "Email", type: "email"},
                {name: "password", label: "Password", type: "password"},
            ]}
        />
    );
}

export default LoginPage