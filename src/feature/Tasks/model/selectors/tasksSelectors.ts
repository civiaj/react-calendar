import { RootState } from "app/providers/StoreProvider";

export const getTaskIsAdding = (state: RootState) => state.tasks.isAdding;
export const getTaskIsOpen = (state: RootState) => state.tasks.isOpen;
export const getTasks = (state: RootState) => state.tasks.tasks;
export const getIsModal = (state: RootState) => state.tasks.isModal;
export const getModalInfo = (state: RootState) => state.tasks.modalInfo;
export const getTasksView = (state: RootState) => state.tasks.view;
