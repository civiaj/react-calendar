import { useAppSelector } from "app/providers/StoreProvider";
import { getVeiw } from "feature/Calendar/model/selectors/calendarSelectors";
import { ViewDays } from "feature/Calendar/ui/ViewDays/ViewDays";
import { ViewMonths } from "feature/Calendar/ui/ViewMonths/ViewMonths";
import { ViewYears } from "feature/Calendar/ui/ViewYears/ViewYears";
import { ReactNode } from "react";

export const CalendarBody = () => {
    const view = useAppSelector(getVeiw);
    let body: ReactNode = "";

    switch (view) {
        case "days": {
            body = <ViewDays />;
            break;
        }
        case "months": {
            body = <ViewMonths />;
            break;
        }
        case "years": {
            body = <ViewYears />;
        }
    }

    return body;
};
