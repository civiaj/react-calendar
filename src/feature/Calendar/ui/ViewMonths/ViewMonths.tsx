import { useMemo } from "react";
import { useAppSelector } from "app/providers/StoreProvider";
import { generateMonths } from "shared/lib/formatDate/generateMonths";
import { getMutableDate } from "../../model/selectors/calendarSelectors";
import { CalendarMonth } from "../../ui/CalendarMonth/CalendarMonth";

export const ViewMonths = () => {
    const mutableDate = useAppSelector(getMutableDate);
    const months = useMemo(() => generateMonths(mutableDate.year), [mutableDate]);

    const renderMonths = useMemo(
        () =>
            months.map((row, index) => (
                <ul className="flex" key={index}>
                    {row.map((dateString) => (
                        <CalendarMonth dateString={dateString} key={dateString} />
                    ))}
                </ul>
            )),
        [months]
    );

    return <div className="mt-4">{renderMonths}</div>;
};
