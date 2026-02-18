import {useState, useEffect} from "react";
import {useAuthContext} from "../../context/AuthContext.tsx";
import {programService} from "../../services/programService.ts";

export interface IProgram {
    id: string;
    name: string;
}

export const usePrograms = () => {
    const { token } = useAuthContext();
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string[] | null>(null);

    const fetchPrograms = async () => {
        if (!token) return;

        setLoading(true);
        try {
            const data = await programService.getPrograms(token);
            setPrograms(data);
            setError(null);
        } catch (err: any) {
            const messages = Array.isArray(err) ? err : [String(err)];
            setError(messages);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, [token]);

    return {
        programs,
        loading,
        error,
        refetch: fetchPrograms,
    };
};
