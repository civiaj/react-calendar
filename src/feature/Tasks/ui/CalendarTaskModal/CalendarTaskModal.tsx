import { useAppDispatch, useAppSelector } from "app/providers/StoreProvider";
import { getModalInfo } from "feature/Tasks/model/selectors/tasksSelectors";
import { createPortal } from "react-dom";
import { tasksActions } from "../../model/slice/tasksSlice";
import { useCallback, useEffect } from "react";

interface CalendaerTaskModalProps {
    activeDate: string;
}

export const CalendarTaskModal = ({ activeDate }: CalendaerTaskModalProps) => {
    const modalInfo = useAppSelector(getModalInfo);
    const dispatch = useAppDispatch();
    const onCloseModal = useCallback(() => dispatch(tasksActions.closeModal()), [dispatch]);
    const onDeleteTask = useCallback(
        () => dispatch(tasksActions.deleteTask({ activeDate, date: modalInfo.id })),
        [dispatch, activeDate, modalInfo.id]
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCloseModal();
            else if (e.key === "Enter") onDeleteTask();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onCloseModal, onDeleteTask]);

    return createPortal(
        <div className="modal">
            <div className="modalOverlay" onClick={onCloseModal}></div>
            <div className="modalContent">
                <p>
                    Вы действительно хотите безвозвратно удалить задачу <span>{modalInfo.text}</span>?
                </p>
                <div className="modalActions mt-s">
                    <button onClick={onDeleteTask} className="btn btn--padding btn--border">
                        Удалить
                    </button>
                    <button className="btn btn--padding btn--border" onClick={onCloseModal}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("root")!
    );
};
