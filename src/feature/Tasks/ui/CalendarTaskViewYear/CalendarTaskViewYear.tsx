import { useAppDispatch, useAppSelector } from "app/providers/StoreProvider";
import { format, getMonth, getYear } from "date-fns";
import { ru } from "date-fns/locale";
import { calendarActions } from "feature/Calendar";
import { getTasks } from "feature/Tasks";
import { tasksActions } from "feature/Tasks/model/slice/tasksSlice";
import { useCallback, useMemo } from "react";
import { generateWord } from "shared/lib/formatDate/generateWord";

interface CalendarTaskViewYearProps {
    activeDate: string;
}

interface TaskYear {
    year: number;
    month: number;
    monthName: string;
    amount: number;
}

export const CalendarTaskViewYear = ({ activeDate }: CalendarTaskViewYearProps) => {
    const tasks = useAppSelector(getTasks);
    const dispatch = useAppDispatch();

    const handleClick = useCallback(
        (month: number) => {
            dispatch(tasksActions.setView("month"));
            dispatch(calendarActions.setMonth(month));
        },
        [dispatch]
    );

    const removeMonthDuplicates = (arr: TaskYear[]) => {
        const r = [];
        for (let i = 0; i < arr.length; i++) {
            const index = r.findIndex((e) => e.month === arr[i].month);
            index === -1 ? r.push(arr[i]) : (r[index].amount += arr[i].amount);
        }
        return r;
    };

    const existedTasks = useMemo(
        () =>
            removeMonthDuplicates(
                Object.entries(tasks)
                    .map(([key, value]) => {
                        const d = new Date(key);
                        return {
                            year: getYear(d),
                            month: getMonth(d),
                            monthName: format(d, "LLLL", { locale: ru }),
                            amount: value.length,
                        };
                    })
                    .filter((e) => e.year === getYear(new Date(activeDate)))
            ).sort((a, b) => a.month - b.month),
        [activeDate, tasks]
    );

    console.log(existedTasks);

    const renderedTasks = useMemo(
        () =>
            existedTasks.map((task) => (
                <li className="task--month" key={task.month}>
                    <button
                        className="btn btn--fullWidth btn--padding btn--border"
                        onClick={() => handleClick(task.month)}
                    >
                        <p className="boldText boldText--small">
                            {task.monthName}: {task.amount} {generateWord(task.amount.toString())}
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
