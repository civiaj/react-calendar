import { useAppDispatch, useAppSelector } from "app/providers/StoreProvider";
import { getYear } from "date-fns";
import { calendarActions } from "feature/Calendar";
import { getTasks } from "feature/Tasks";
import { tasksActions } from "feature/Tasks/model/slice/tasksSlice";
import { useCallback, useMemo } from "react";
import { generateWord } from "shared/lib/formatDate/generateWord";

interface TaskYear {
    year: number;
    amount: number;
}

export const CalendarTaskViewAll = () => {
    const tasks = useAppSelector(getTasks);
    const dispatch = useAppDispatch();

    const handleClick = useCallback(
        (year: number) => {
            dispatch(tasksActions.setView("year"));
            dispatch(calendarActions.setYear(year));
        },
        [dispatch]
    );

    const removeMonthDuplicates = (arr: TaskYear[]) => {
        const r = [];
        for (let i = 0; i < arr.length; i++) {
            const index = r.findIndex((e) => e.year === arr[i].year);
            index === -1 ? r.push(arr[i]) : (r[index].amount += arr[i].amount);
        }
        return r;
    };

    const existedTasks = useMemo(
        () =>
            removeMonthDuplicates(
                Object.entries(tasks).map(([key, value]) => {
                    const d = new Date(key);
                    return {
                        year: getYear(d),
                        amount: value.length,
                    };
                })
            ).sort((a, b) => a.year - b.year),
        [tasks]
    );

    const renderedTasks = useMemo(
        () =>
            existedTasks.map((task) => (
                <li className="task--month" key={task.year}>
                    <button
                        className="btn btn--fullWidth btn--padding btn--border"
                        onClick={() => handleClick(task.year)}
                    >
                        <p className="boldText boldText--small">
                            {task.year}: {task.amount} {generateWord(task.amount.toString())}
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
};
