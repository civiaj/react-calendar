import { useAppDispatch, useAppSelector } from "app/providers/StoreProvider";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { getActive } from "feature/Calendar";
import { CalendarTaskViewDay } from "../../ui/CalendarTaskViewDay/CalendarTaskViewDay";
import { Down, Up } from "shared/assets/icons/Arrows";
import { getTaskIsOpen, getTasksView } from "../../model/selectors/tasksSelectors";
import { tasksActions } from "../../model/slice/tasksSlice";
import { ReactNode, useEffect } from "react";
import { CalendarTaskViewMonth } from "../../ui/CalendarTaskViewMonth/CalendarTaskViewMonth";
import { CalendarTaskViewYear } from "../../ui/CalendarTaskViewYear/CalendarTaskViewYear";
import { getMutable } from "feature/Calendar";
import { classNames } from "shared/lib/classNames/classNames";
import { CalendarTaskViewAll } from "feature/Tasks/ui/CalendarTaskViewAll/CalendarTaskViewAll";

export const CalendarTasks = () => {
    const activeDate = useAppSelector(getActive);
    const mutableDate = useAppSelector(getMutable);
    const isOpen = useAppSelector(getTaskIsOpen);
    const dispatch = useAppDispatch();
    const view = useAppSelector(getTasksView);
    const onOpen = () => dispatch(tasksActions.changeIsOpen());
    let dateString = "";
    let tasks: ReactNode = "";
    let action;

    switch (view) {
        case "day": {
            tasks = <CalendarTaskViewDay activeDate={activeDate} />;
            dateString = "Задачи на " + format(new Date(activeDate), "d MMMM", { locale: ru });
            action = () => dispatch(tasksActions.setView("month"));
            break;
        }
        case "month": {
            tasks = <CalendarTaskViewMonth activeDate={mutableDate} />;
            dateString = "Задачи на " + format(new Date(mutableDate), "LLLL", { locale: ru });
            action = () => dispatch(tasksActions.setView("year"));
            break;
        }
        case "year": {
            tasks = <CalendarTaskViewYear activeDate={mutableDate} />;
            dateString = "Задачи на " + format(new Date(mutableDate), "yyyy", { locale: ru });
            action = () => dispatch(tasksActions.setView("all"));
            break;
        }
        case "all": {
            tasks = <CalendarTaskViewAll />;
            dateString = "Все задачи";
        }
    }

    useEffect(() => {
        dispatch(tasksActions.setView("day"));
    }, [activeDate, dispatch]);

    return (
        <div className="calendarWidth">
            <div className="flex flex--between mb-vs">
                <button
                    className={classNames("btn btn--padding btn--fullWidth btn--border", {
                        "btn--inactive": view === "all",
                    })}
                    onClick={action}
                >
                    <p className="boldText">{dateString}</p>
                </button>
                <button className="btn btn--border" onClick={onOpen}>
                    {isOpen ? <Up /> : <Down />}
                </button>
            </div>

            {isOpen && tasks}
        </div>
    );
};
