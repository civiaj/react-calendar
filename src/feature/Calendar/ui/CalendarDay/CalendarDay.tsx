import { memo } from "react";
import { useAppDispatch, useAppSelector } from "app/providers/StoreProvider";
import { classNames } from "shared/lib/classNames/classNames";
import { Dot } from "shared/assets/icons/Dot";
import { getDate, getMonth, getYear } from "date-fns";
import { getActiveDate, getMutableDate, getTodayDate } from "../../model/selectors/calendarSelectors";
import { calendarActions } from "../../model/slice/calendarSlice";

interface CalendaerDayProps {
    dateString: string;
    exist: boolean;
}

export const CalendarDay = memo((props: CalendaerDayProps) => {
    const { dateString, exist } = props;
    const dispatch = useAppDispatch();
    const todayDate = useAppSelector(getTodayDate);
    const activeDate = useAppSelector(getActiveDate);
    const mutableDate = useAppSelector(getMutableDate);
    const thisDate = {
        year: getYear(new Date(dateString)),
        monthIndex: getMonth(new Date(dateString)),
        day: getDate(new Date(dateString)),
    };
    const thisInactive = mutableDate.monthIndex != thisDate.monthIndex;
    const thisToday = Object.entries(thisDate).every(
        ([key, value]) => value === todayDate[key as keyof typeof thisDate]
    );
    const thisActive = Object.entries(thisDate).every(
        ([key, value]) => value === activeDate[key as keyof typeof thisDate]
    );
    const thisActiveAndToday = thisToday && thisActive;

    const onDayClick = () => {
        if (thisInactive)
            thisDate.monthIndex < mutableDate.monthIndex
                ? dispatch(calendarActions.changeMonth(-1))
                : dispatch(calendarActions.changeMonth(1));
        else dispatch(calendarActions.setActiveDate(dateString));
    };

    return (
        <li className="cell">
            <button
                onClick={onDayClick}
                className={classNames(
                    "btn",
                    {
                        ["btn--inactive"]: thisInactive,
                        ["btn--today"]: thisToday,
                        ["btn--active"]: thisActive,
                        ["btn--active-today"]: thisActiveAndToday,
                    },
                    []
                )}
            >
                {thisDate.day}
                {exist && (
                    <div className="dot">
                        <Dot />
                    </div>
                )}
            </button>
        </li>
    );
});
