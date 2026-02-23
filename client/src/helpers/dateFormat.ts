export const formatFullDate = (date: string | Date | undefined) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric",});
};