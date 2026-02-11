export interface InputFieldProps<Type extends string | number = string> {
    label: string;
    value: Type;
    onChange: (value: Type) => void;
    type?: "text" | "email" | "password" | "number" | "datetime-local";
    placeholder?: string;
    name?: string;
    id?: string;
    required?: boolean;
    disabled?: boolean;
    min?: number;
    max?: number;
}

export interface IDateInputFieldProps {
    form: {
        date: string;
        setDate: (value: string) => void;
    };
}