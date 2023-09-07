export type View = "days" | "months" | "years";

export interface Calendar {
    todayDate: string;
    activeDate: string;
    mutableDate: string;
    view: View;
    firstDay: number;
    look: "short" | "full";
    decade: number;
}
