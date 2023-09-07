import { NUM_OF_COLUMNS_YEARS, NUM_OF_ROWS_YEARS } from "shared/const/const";

export const generateYears = (decadeStart: number) => {
    const result: Array<Array<string>> = [];
    const remainder = decadeStart % 4;
    const remap = {
        "2": 3,
        "0": 1,
    };

    let year = decadeStart - remap[String(remainder) as keyof typeof remap];

    for (let i = 0; i < NUM_OF_ROWS_YEARS; i++) {
        result[i] = [];
        for (let j = 0; j < NUM_OF_COLUMNS_YEARS; j++) {
            result[i][j] = new Date(year++, 1, 0).toUTCString();
        }
    }

    return result;
};
