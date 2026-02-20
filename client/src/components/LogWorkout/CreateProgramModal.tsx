import React, {useState} from "react";
import InputField from "../Layout/UI/InputField/InputField.tsx";
import Modal from "../Layout/UI/Modal/Modal.tsx";
import Button from "../Layout/UI/Button/Button.tsx";
import Error from "../Layout/General/Error/Error.tsx";

interface ICreateProgramModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string) => Promise<void>;
    loading: boolean;
    error?: string[] | null;
}

const CreateProgramModal: React.FC<ICreateProgramModalProps> = ({
                                                                    isOpen, onClose, onCreate, loading, error
                                                                }) => {
    const [name, setName] = useState("");

    if (!isOpen) return null;

    const handleCreate = async () => {
        if (!name.trim()) return;
        await onCreate(name);
        setName("");
    };

    return (
        <Modal title="Create ProgramPage" onClose={onClose}>
            <div className="flex flex-col gap-4">
                <InputField
                    label="ProgramPage Name"
                    value={name}
                    onChange={setName}/>

                {error && error.length > 0 && (
                    <Error messages={error}/>
                )}

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        disabled={!name || loading}
                        onClick={handleCreate}>
                        {loading ? "Creating..." : "Create"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default CreateProgramModal;
