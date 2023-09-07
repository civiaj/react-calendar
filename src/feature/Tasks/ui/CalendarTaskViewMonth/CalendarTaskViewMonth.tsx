import { useAppDispatch, useAppSelector } from "app/providers/StoreProvider";
import { format, getDate, getMonth, getYear } from "date-fns";
import { calendarActions } from "feature/Calendar";
import { getTasks } from "feature/Tasks";
import { tasksActions } from "feature/Tasks/model/slice/tasksSlice";
import { memo, useCallback, useMemo } from "react";
import { generateWord } from "shared/lib/formatDate/generateWord";

interface CalendarTaskViewMonthProps {
    activeDate: string;
}

export const CalendarTaskViewMonth = memo(({ activeDate }: CalendarTaskViewMonthProps) => {
    const tasks = useAppSelector(getTasks);
    const dispatch = useAppDispatch();

    const handleClick = useCallback(
        (date: string) => {
            dispatch(calendarActions.setDateFromTasks(date));
            dispatch(tasksActions.setView("day"));
        },
        [dispatch]
    );

    const existedTasks = useMemo(
        () =>
            Object.entries(tasks)
                .map(([key, value]) => {
                    const d = new Date(key);
                    return {
                        year: getYear(d),
                        month: getMonth(d),
                        date: key,
                        day: format(d, "dd"),
                        dayN: getDate(d),
                        amount: value.length,
                    };
                })
                .filter(
                    (e) =>
                        e.month === getMonth(new Date(activeDate)) && e.year === getYear(new Date(activeDate))
                )
                .sort((a, b) => a.dayN - b.dayN),
        [activeDate, tasks]
    );

    const renderedTasks = useMemo(
        () =>
            existedTasks.map((task) => (
                <li className="task--month" key={task.day}>
                    <button
                        className="btn btn--fullWidth btn--padding btn--border"
                        onClick={() => handleClick(task.date)}
                    >
                        <p className="boldText boldText--small">
                            {task.day}: {task.amount} {generateWord(task.amount.toString())}
                        </p>
                    </button>
                </li>
            )),
        [existedTasks, handleClick]
    );

    return (
        <ul className="tasks--dates">
            {existedTasks.length ? (
                renderedTasks
            ) : (
                <p className="tasks--empty">На этот месяц список задач пуст.</p>
            )}
        </ul>
    );
});
