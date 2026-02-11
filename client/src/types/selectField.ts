export interface IOption {
    value: string;
    label: string;
}

export interface ISelectFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: IOption[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
}