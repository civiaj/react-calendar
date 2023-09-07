import { useMemo } from "react";
import { useAppSelector } from "app/providers/StoreProvider";
import { generateYears } from "shared/lib/formatDate/generateYears";
import { getDateDecade } from "../../model/selectors/calendarSelectors";
import { CalendarYear } from "../../ui/CalendarYear/CalendarYear";

export const ViewYears = () => {
    const decade = useAppSelector(getDateDecade);
    const years = useMemo(() => generateYears(decade), [decade]);

    const renderMonths = useMemo(
        () =>
            years.map((row, index) => (
                <ul className="flex" key={index}>
                    {row.map((dateString) => (
                        <CalendarYear key={dateString} dateString={dateString} />
                    ))}
                </ul>
            )),
        [years]
    );

    return <div className="mt-4">{renderMonths}</div>;
};
