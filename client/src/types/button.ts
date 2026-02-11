import React from "react";

export interface IButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "outline" | "remove";
    to?: string;
}