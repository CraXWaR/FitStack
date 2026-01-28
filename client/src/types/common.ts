export interface ILoading {
    text?: string;
}

export interface IError {
    messages?: string[];
    actionText?: string;
    onAction?: () => void;
}