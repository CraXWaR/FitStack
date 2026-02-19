import React, {useState} from "react";

import type {useProgramSubmit} from "../../hooks/program/useProgramSubmit.ts";
import type {useWorkoutForm} from "../../hooks/workout/useWorkoutForm.ts";
import type {IProgram} from "../../types/program.ts";

import CreateProgramModal from "./CreateProgramModal.tsx";
import SelectField from "../Layout/UI/Select/SelectField.tsx";

const ProgramSelector: React.FC<{
    form: ReturnType<typeof useWorkoutForm>;
    programs: IProgram[];
    loading: boolean;
    token: string | null;
    refetch: () => Promise<void>;
    createProgram: ReturnType<typeof useProgramSubmit>["submit"];
    creatingProgram: boolean;
    createProgramError: string[] | null;
}> = ({form, programs, loading, token, refetch, createProgram, creatingProgram, createProgramError}) => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <SelectField
                label="Program"
                value={form.programId ?? ""}
                onChange={(value) => {
                    if (value === "__create__") setModalOpen(true); else form.setProgramId(value || undefined);
                }}
                options={[{value: "__create__", label: "➕ Create new program"}, ...programs.map((p) => ({
                    value: p.id,
                    label: p.name
                })),]}
                disabled={loading}/>

            <CreateProgramModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                loading={creatingProgram}
                error={createProgramError}
                onCreate={async (name) => {
                    if (!token) return;
                    const program = await createProgram(token, {name});
                    await refetch();
                    form.setProgramId(program.id);
                    setModalOpen(false);
                }}
            />
        </>
    );
};

export default ProgramSelector