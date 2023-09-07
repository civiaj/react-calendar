import { useAppDispatch } from "app/providers/StoreProvider";
import { CalendarTaskForm } from "feature/Tasks/ui/CalendarTaskForm/CalendarTaskForm";
import { useState } from "react";
import { Check, Close, Delete, Edit, Kebab, Process, Urgent, Usual } from "shared/assets/icons/ItemActions";
import { OutsideClickWrapper } from "shared/ui/OutsideClickWrapper/OutsideClickWrapper";
import { tasksActions } from "../../model/slice/tasksSlice";
import { ChangeTasksTextsProps, Task } from "../../model/types/calendarTasks";

interface TaskProps {
    task: Task;
    activeDate: string;
}

export const CalendarTask = (props: TaskProps) => {
    const { task, activeDate } = props;
    const dispatch = useAppDispatch();

    const onCheckChange = () => dispatch(tasksActions.changeTaskIsDone({ date: task.date, activeDate }));
    const onUrgencyChange = () => dispatch(tasksActions.changeTaskIsUrgent({ date: task.date, activeDate }));

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => {
        setIsEdit(true);
        setMenuOpen(false);
    };

    const onCancelEdit = () => {
        setIsEdit(false);
    };

    const onSaveChange = (newValue: ChangeTasksTextsProps) => {
        dispatch(tasksActions.changeTaskTexts(newValue));
        onCancelEdit();
    };

    const onDeleteTask = () => {
        dispatch(tasksActions.openModal({ id: task.date, text: task.title }));
        setMenuOpen(false);
    };

    return (
        <li className="task">
            {!isEdit ? (
                <>
                    <div className="flex flex--between flex--task">
                        <p className="boldText boldText--small boldText--task">{task.title}</p>
                        <button className="btn" onClick={() => setMenuOpen(true)}>
                            <Kebab />
                        </button>
                    </div>
                    <p className="taskBody">{task.body}</p>
                </>
            ) : (
                <CalendarTaskForm
                    dateString={task.date}
                    activeDate={activeDate}
                    onCancel={onCancelEdit}
                    onSaveChange={onSaveChange}
                    initialBody={task.body}
                    initialTitle={task.title}
                    heading={"Редактирование"}
                />
            )}

            <div className="flex flex--statuses">
                {task.isUrgent && !task.isDone && <div className="status status--urgent">Срочное</div>}
                {!task.isUrgent && !task.isDone && <div className="status status--usual">Обычное</div>}
                {task.isDone && <div className="status status--done">Выполнено</div>}
                {!task.isDone && <div className="status status--inprocess">В процессе</div>}
            </div>
            {isMenuOpen && (
                <OutsideClickWrapper callback={() => setMenuOpen(false)}>
                    <ul className="edits">
                        <li className="edit" onClick={() => setMenuOpen(false)}>
                            <Close />
                            <p>Закрыть</p>
                        </li>
                        {!isEdit && !task.isDone && (
                            <li className="edit" onClick={onEdit}>
                                <Edit />
                                <p>Редактировать</p>
                            </li>
                        )}
                        <li className="edit" onClick={onCheckChange}>
                            {task.isDone ? (
                                <>
                                    <Process />
                                    <p>Запустить</p>
                                </>
                            ) : (
                                <>
                                    <Check />
                                    <p>Выполненить</p>
                                </>
                            )}
                        </li>
                        {!task.isDone && (
                            <li className="edit" onClick={onUrgencyChange}>
                                {task.isUrgent ? (
                                    <>
                                        <Usual />
                                        <p>Обычное</p>
                                    </>
                                ) : (
                                    <>
                                        <Urgent />
                                        <p>Срочное</p>
                                    </>
                                )}
                            </li>
                        )}
                        <li className="edit" onClick={onDeleteTask}>
                            <Delete />
                            <p>Удалить</p>
                        </li>
                    </ul>
                </OutsideClickWrapper>
            )}
        </li>
    );
};
