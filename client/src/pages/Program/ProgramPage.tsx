import React, {useState, type FormEvent} from "react";
import styles from "./ProgramPage.module.css";
import Form from "../../components/Layout/UI/Form/Form";
import InputField from "../../components/Layout/UI/InputField/InputField.tsx";
import {useAuthContext} from "../../context/AuthContext.tsx";
import type {ICreateProgram} from "../../types/program.ts";
import {useProgramSubmit} from "../../hooks/program/useProgramSubmit.ts";

const ProgramPage: React.FC = () => {
    const [name, setName] = useState("");
    const {token} = useAuthContext();
    const {submit, submitting, error, success} = useProgramSubmit();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!token) return;
        const payload: ICreateProgram = {name};
        await submit(token, payload);
        setName("");
    };

    return (
        <div className={styles.pageWrapper}>
            <Form
                title="Create Workout Program"
                submitText={submitting ? "Creating..." : "Create Program"}
                onSubmit={handleSubmit}
                error={error}
                success={success}>
                <div className="flex flex-col gap-2">
                    <InputField
                        label="Program Name"
                        value={name}
                        onChange={setName}
                    />
                </div>
            </Form>
        </div>
    );
};

export default ProgramPage;
