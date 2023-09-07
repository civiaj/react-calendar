import { MONTH_FIRST_DAY, NUM_OF_DAYS_IN_WEEK, NUM_OF_ROWS_DAYS } from "shared/const/const";

export const generateMonthDays = (month: number, year: number, startWeekDay: number) => {
    const weekDay = new Date(year, month).getDay();
    let startFromDay = weekDay - startWeekDay;

    if (startFromDay < 0) {
        const remap: { [key: string]: number } = {
            "-1": 6,
            "-2": 5,
            "-3": 4,
            "-4": 3,
            "-5": 2,
            "-6": 1,
        };
        startFromDay = remap[startFromDay];
    }

    const result: Array<Array<string>> = [];
    let day = MONTH_FIRST_DAY - startFromDay;

    for (let i = 0; i < NUM_OF_ROWS_DAYS; i++) {
        result[i] = [];
        for (let j = 0; j < NUM_OF_DAYS_IN_WEEK; j++) {
            result[i][j] = new Date(year, month, day).toUTCString();
            day++;
        }
    }

    return result;
};
