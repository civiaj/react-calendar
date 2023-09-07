import { DAYS_OF_THE_WEEK } from "shared/const/const";

export const orderDaysOfTheWeek = (startDay: number, view: "short" | "full") => {
    const arr = [...DAYS_OF_THE_WEEK];
    const start = arr.splice(startDay, arr.length - 1);
    const result = [...start, ...arr];
    return view === "short" ? result.map((day) => day.slice(0, 1)) : result;
};
