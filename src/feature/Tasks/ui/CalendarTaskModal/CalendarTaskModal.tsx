import { useAppDispatch, useAppSelector } from "app/providers/StoreProvider";
import { tasksActions } from "../../model/slice/tasksSlice";
import { createPortal } from "react-dom";
import { getModalInfo } from "feature/Tasks/model/selectors/tasksSelectors";

interface CalendaerTaskModalProps {
    activeDate: string;
}

export const CalendarTaskModal = ({ activeDate }: CalendaerTaskModalProps) => {
    const modalInfo = useAppSelector(getModalInfo);
    const dispatch = useAppDispatch();
    const onCloseModal = () => dispatch(tasksActions.closeModal());
    const onDeleteTask = () => dispatch(tasksActions.deleteTask({ activeDate, date: modalInfo.id }));

    return createPortal(
        <div className="modal">
            <div className="modalContainer">
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
            </div>
        </div>,
        document.getElementById("root")!
    );
};
