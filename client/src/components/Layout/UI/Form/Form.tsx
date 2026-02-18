import React from "react";

import Button from "../Button/Button.tsx";
import Error from "../../General/Error/Error.tsx";
import Success from "../../General/Success/Success.tsx";

import styles from "./Form.module.css"

interface IFormProps {
    title: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    submitText: string;
    error?: string[] | null;
    success?: string | null;
    children: React.ReactNode;
    submitting?: boolean;
}

const Form = ({title, onSubmit, submitText, error, success, children, submitting,}: IFormProps) => {
    return (
        <div className={styles.formCard}>
            <h1 className={styles.title}>{title}</h1>

            {error && <Error messages={error}/>}
            {success && <Success message={success}/>}

            <form onSubmit={onSubmit}>
                {children}

                <div className={"border-t border-gray-700 pt-4 justify-center flex"}>
                    <Button
                        type="submit"
                        className={"w-full"}
                        variant="primary"
                        disabled={submitting}>
                        {submitting ? "Submitting..." : submitText}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Form;