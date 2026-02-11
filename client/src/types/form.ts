import React from "react";

export interface IFormProps {
    title: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    submitText: string;
    error?: React.ReactNode;
    success?: React.ReactNode;
    footer?: React.ReactNode;
    children: React.ReactNode;
    submitting?: boolean;
}