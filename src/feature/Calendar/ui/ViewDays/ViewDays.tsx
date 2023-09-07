import { useMemo } from "react";
import { useAppSelector } from "app/providers/StoreProvider";
import { generateMonthDays } from "shared/lib/formatDate/generateMonthDays";
import { orderDaysOfTheWeek } from "shared/lib/formatDate/orderDaysOfTheWeek";
import { getFirstDay, getLook, getMutableDate } from "../../model/selectors/calendarSelectors";
import { CalendarDay } from "../../ui/CalendarDay/CalendarDay";
import { getTasks } from "feature/Tasks";

export const ViewDays = () => {
    const mutableDate = useAppSelector(getMutableDate);
    const tasks = useAppSelector(getTasks);
    const firstDay = useAppSelector(getFirstDay);
    const look = useAppSelector(getLook);

    const days = useMemo(
        () => generateMonthDays(mutableDate.monthIndex, mutableDate.year, firstDay),
        [firstDay, mutableDate]
    );

    const renderDays = useMemo(
        () =>
            days.map((row, index) => (
                <ul className="flex" key={index}>
                    {row.map((dateString) => (
                        <CalendarDay
                            exist={dateString in tasks && !!tasks[dateString].length}
                            key={dateString}
                            dateString={dateString}
                        />
                    ))}
                </ul>
            )),
        [days, tasks]
    );

    const renderWeekDays = useMemo(
        () =>
            orderDaysOfTheWeek(firstDay, look).map((weekDay, index) => (
                <li key={index} className="weekDay">
                    {weekDay}
                </li>
            )),
        [firstDay, look]
    );
    return (
        <>
            <ul className="flex">{renderWeekDays}</ul>
            {renderDays}
        </>
    );
};
