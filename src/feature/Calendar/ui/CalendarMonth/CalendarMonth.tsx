import { useAppDispatch, useAppSelector } from "app/providers/StoreProvider";
import { format, getMonth, getYear } from "date-fns";
import { ru } from "date-fns/locale";
import { Dot } from "shared/assets/icons/Dot";
import { classNames } from "shared/lib/classNames/classNames";
import { calendarActions } from "../../model/slice/calendarSlice";
import { getMutableDate } from "../../model/selectors/calendarSelectors";
import { getTasks } from "feature/Tasks";

interface CalendarMonthProps {
    dateString: string;
}

export const CalendarMonth = (props: CalendarMonthProps) => {
    const { dateString } = props;
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(getTasks);
    const mutableDate = useAppSelector(getMutableDate);

    const thisDate = {
        year: getYear(new Date(dateString)),
        monthIndex: getMonth(new Date(dateString)),
        monthName: format(new Date(dateString), "MMM", { locale: ru }),
    };

    const thisInactive = mutableDate.year !== thisDate.year;

    const onSelectMonth = () => {
        if (!thisInactive) {
            dispatch(calendarActions.setMonth(thisDate.monthIndex));
            dispatch(calendarActions.setView("days"));
        } else {
            dispatch(calendarActions.changeYear(1));
        }
    };

    const exist = Object.keys(tasks)
        .map((date) => {
            const d = new Date(date);
            return { year: getYear(d), month: getMonth(d) };
        })
        .find((e) => e.month === thisDate.monthIndex && e.year === thisDate.year);

    return (
        <li className="cell">
            <button
                onClick={onSelectMonth}
                className={classNames("btn btn--big-cell", { ["btn--inactive"]: thisInactive }, [])}
            >
                {thisDate.monthName}
                {exist && (
                    <div className="dot dot--big-cell">
                        <Dot />
                    </div>
                )}
            </button>
        </li>
    );
};
