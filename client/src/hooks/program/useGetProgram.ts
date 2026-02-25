import {useState, useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";
import type {IProgram} from "../../types/program.ts";
import {programService} from "../../services/programService.ts";
import {useAuthContext} from "../../context/AuthContext.tsx";

export const useGetProgram = () => {
    const {token} = useAuthContext();
    const {slug} = useParams<{ slug: string }>();

    const location = useLocation();
    const initialProgram = location.state as IProgram | undefined;

    const [program, setProgram] = useState<IProgram | null>(initialProgram ?? null);
    const [loading, setLoading] = useState(!initialProgram);
    const [error, setError] = useState<{ messages: string[] } | null>(null);

    useEffect(() => {
        if (program || !slug || !token) return;

        const fetchProgram = async () => {
            setLoading(true);
            try {
                const data = await programService.getProgramBySlug(token, slug);
                setProgram(data);
            } catch (err: any) {
                setError({messages: err.response?.data?.errors?.map((e: any) => e.message) || ["Failed to load program"],});
            } finally {
                setLoading(false);
            }
        };

        fetchProgram();
    }, [slug, program]);

    return {program, loading, error};
};