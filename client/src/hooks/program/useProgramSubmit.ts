import {useState} from "react";
import type {ICreateProgram, IProgramResponse} from "../../types/program.ts";
import {programService} from "../../services/programService.ts";

export const useProgramSubmit = () => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string[] | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const submit = async (token: string, payload: ICreateProgram): Promise<IProgramResponse> => {
        setSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            const program = await programService.createProgram(token, payload);
            setSuccess(`Program created! Name: ${program.name}`);
            return program;
        } catch (err: any) {
            setError(err);
            throw err;
        } finally {
            setSubmitting(false);
        }
    };

    return {submit, submitting, error, success};
};