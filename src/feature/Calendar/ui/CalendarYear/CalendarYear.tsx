import { useAppDispatch, useAppSelector } from "app/providers/StoreProvider";
import { getYear } from "date-fns";
import { Dot } from "shared/assets/icons/Dot";
import { getDateDecade } from "../../model/selectors/calendarSelectors";
import { classNames } from "shared/lib/classNames/classNames";
import { calendarActions } from "../../model/slice/calendarSlice";
import { getTasks } from "feature/Tasks";

interface CalendarYearProps {
    dateString: string;
}

export const CalendarYear = (props: CalendarYearProps) => {
    const { dateString } = props;
    const dispatch = useAppDispatch();
    const decade = useAppSelector(getDateDecade);
    const thisDate = getYear(new Date(dateString));
    const thisInactive = thisDate < decade || thisDate > decade + 9;
    const tasks = useAppSelector(getTasks);

    const onSelectYear = () => {
        if (!thisInactive) {
            dispatch(calendarActions.setYear(thisDate));
            dispatch(calendarActions.setView("months"));
        } else {
            dispatch(calendarActions.changeDecade(thisDate < decade ? "decrease" : "decrease"));
        }
    };

    const exist = Object.keys(tasks)
        .map((date) => getYear(new Date(date)))
        .includes(thisDate);

    return (
        <li className="cell">
            <button
                onClick={onSelectYear}
                className={classNames("btn btn--big-cell", { "btn--inactive": thisInactive }, [])}
            >
                {thisDate}
                {exist && (
                    <div className="dot dot--big-cell">
                        <Dot />
                    </div>
                )}
            </button>
        </li>
    );
};
