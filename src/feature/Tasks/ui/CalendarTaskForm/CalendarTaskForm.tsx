import { AddNewTaskProps, ChangeTasksTextsProps } from "feature/Tasks/model/types/calendarTasks";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";

interface CalendarTaskFormProps {
    withUrgent?: boolean;
    makeFocus?: boolean;
    onSaveNew?: (value: AddNewTaskProps) => void;
    onSaveChange?: (value: ChangeTasksTextsProps) => void;
    onCancel: () => void;
    activeDate: string;
    dateString?: string;
    initialTitle?: string;
    initialBody?: string;
    heading?: string;
}

export const CalendarTaskForm = (props: CalendarTaskFormProps) => {
    const {
        withUrgent = true,
        makeFocus = true,
        onCancel,
        onSaveNew,
        onSaveChange,
        activeDate,
        dateString,
        initialTitle = "",
        initialBody = "",
        heading = "Добавление новой задачи",
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState(initialTitle);
    const [body, setBody] = useState(initialBody);
    const [isUrgent, setIsUrgent] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setIsError(false);
        setTitle(e.target.value);
    };
    const handleBodyChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setIsError(false);
        setBody(e.target.value);
    };

    const handleUrgencyChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setIsError(false);
        setIsUrgent(e.target.checked);
    };

    const handleSave = () => {
        if ([title, body].every((el) => el.trim().length)) {
            if (onSaveNew) onSaveNew({ body, isUrgent, title, activeDate });
            else if (onSaveChange && dateString) onSaveChange({ body, title, activeDate, date: dateString });
        } else setIsError(true);
    };

    const handleClose = () => {
        onCancel();
    };

    useEffect(() => {
        if (makeFocus) inputRef.current?.focus();
    }, [makeFocus]);

    return (
        <div className="form">
            <p className="boldText boldText--small mt-s">{heading}</p>
            <div className="label">
                <label htmlFor="title">Заголовок</label>
                <input ref={inputRef} id="title" type="text" value={title} onChange={handleTitleChange} />
            </div>
            <div className="label">
                <label htmlFor="body">Текст</label>
                <textarea id="body" value={body} onChange={handleBodyChange} />
            </div>
            {withUrgent && (
                <label className="urgent">
                    <input id="urgent" type="checkbox" checked={isUrgent} onChange={handleUrgencyChange} />
                    Важная задача
                </label>
            )}
            {isError && <p className="form-error">Необходимо заполнить поля</p>}
            <div className="mt-vs flex flex--between">
                <button className="btn btn--border btn--padding" onClick={handleSave}>
                    Сохранить
                </button>
                <button className="btn btn--border btn--padding" onClick={handleClose}>
                    Отмена
                </button>
            </div>
        </div>
    );
};
