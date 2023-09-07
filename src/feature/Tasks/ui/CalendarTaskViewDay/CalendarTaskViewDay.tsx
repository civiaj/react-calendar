import { useAppDispatch, useAppSelector } from "app/providers/StoreProvider";
import { getIsModal, getTaskIsAdding, getTasks } from "feature/Tasks/model/selectors/tasksSelectors";
import { tasksActions } from "feature/Tasks/model/slice/tasksSlice";
import { AddNewTaskProps } from "feature/Tasks/model/types/calendarTasks";
import { CalendarTask } from "feature/Tasks/ui/CalendarTask/CalendarTask";
import { CalendarTaskForm } from "feature/Tasks/ui/CalendarTaskForm/CalendarTaskForm";
import { CalendarTaskModal } from "feature/Tasks/ui/CalendarTaskModal/CalendarTaskModal";
import { useCallback, useEffect, useMemo } from "react";

interface CalendarTaskViewDayProps {
    activeDate: string;
}

export const CalendarTaskViewDay = ({ activeDate }: CalendarTaskViewDayProps) => {
    const dispatch = useAppDispatch();
    const isAdding = useAppSelector(getTaskIsAdding);
    const tasks = useAppSelector(getTasks);
    const isModal = useAppSelector(getIsModal);
    const onCancelTask = useCallback(() => dispatch(tasksActions.setInitial()), [dispatch]);
    const onAddNewTask = (newTask: AddNewTaskProps) => dispatch(tasksActions.addNewTask(newTask));
    const onAdding = () => dispatch(tasksActions.changeIsAdding());

    const existedTasks = useMemo(() => (activeDate in tasks ? tasks[activeDate] : []), [activeDate, tasks]);
    const renderedTasks = useMemo(() => {
        return existedTasks.map((task) => (
            <CalendarTask key={task.date} task={task} activeDate={activeDate} />
        ));
    }, [existedTasks, activeDate]);

    useEffect(() => {
        dispatch(tasksActions.setInitial());
    }, [activeDate, dispatch]);

    useEffect(() => {
        if (isModal) document.querySelector("body")!.style.overflow = "hidden";
        else document.querySelector("body")!.style.overflow = "visible";
        return () => {
            document.querySelector("body")!.style.overflow = "visible";
        };
    }, [isModal]);

    return (
        <>
            {existedTasks.length ? (
                <ul>{renderedTasks}</ul>
            ) : (
                <p className="tasks--empty">На сегодня список пуст.</p>
            )}

            {isAdding ? (
                <CalendarTaskForm onCancel={onCancelTask} onSaveNew={onAddNewTask} activeDate={activeDate} />
            ) : (
                <button
                    className="btn btn--border btn--padding btn--fullWidth centerText mt-vs"
                    onClick={onAdding}
                >
                    Добавить новую задачу
                </button>
            )}

            {isModal && <CalendarTaskModal activeDate={activeDate} />}
        </>
    );
};
