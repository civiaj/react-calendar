export const generateWord = (amount: string) => {
    const value = amount.slice(-1);
    let word = "";
    switch (value) {
        case "1": {
            word = "событие";
            break;
        }
        case "2":
        case "3":
        case "4": {
            word = "события";
            break;
        }
        default: {
            word = "событий";
        }
    }
    return word;
};
