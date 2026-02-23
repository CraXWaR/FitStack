export const formatFullDate = (date: string | Date | undefined) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric",});
};

export const getDayInitial = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {weekday: "short",};
    return date.toLocaleDateString("en-US", options).slice(0, 2).toUpperCase();
};