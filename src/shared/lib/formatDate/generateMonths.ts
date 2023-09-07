import { NUM_OF_COLUMNS_MONTHS, NUM_OF_ROWS_MONTHS } from "shared/const/const";

export const generateMonths = (year: number) => {
    const result: Array<Array<string>> = [];
    let month = 0;
    for (let i = 0; i < NUM_OF_ROWS_MONTHS; i++) {
        result[i] = [];
        for (let j = 0; j < NUM_OF_COLUMNS_MONTHS; j++) {
            result[i][j] = new Date(year, month++).toUTCString();
        }
    }

    return result;
};
