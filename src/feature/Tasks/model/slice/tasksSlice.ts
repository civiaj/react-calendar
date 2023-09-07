import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    AddNewTaskProps,
    ChangeTasksTextsProps,
    TaskViews,
    TasksSchema,
} from "../../model/types/calendarTasks";
import { LOCAL_STORAGE_TASKS } from "shared/const/const";

const initialState: TasksSchema = {
    tasks: JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASKS)!) || {},
    isAdding: false,
    isOpen: true,
    isModal: false,
    modalInfo: { text: "", id: "" },
    view: "day",
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        changeIsOpen: (state) => {
            state.isOpen = !state.isOpen;
        },

        changeIsAdding: (state) => {
            state.isAdding = !state.isAdding;
        },
        setInitial: (state) => {
            state.isAdding = false;
        },
        addNewTask: (state, aciton: PayloadAction<AddNewTaskProps>) => {
            const { body, title, isUrgent, activeDate: key } = aciton.payload;
            const date = new Date().toUTCString();
            const newTask = {
                body,
                title,
                date,
                isDone: false,
                isUrgent,
            };
            key in state.tasks ? state.tasks[key].push(newTask) : (state.tasks[key] = [newTask]);
            tasksSlice.caseReducers.setInitial(state);
            localStorage.setItem(LOCAL_STORAGE_TASKS, JSON.stringify(state.tasks));
        },
        changeTaskIsDone: (state, action: PayloadAction<{ activeDate: string; date: string }>) => {
            const { activeDate: key, date } = action.payload;
            const task = state.tasks[key].find((t) => t.date === date);
            if (task) {
                task.isDone = !task.isDone;
                localStorage.setItem(LOCAL_STORAGE_TASKS, JSON.stringify(state.tasks));
            }
        },
        changeTaskIsUrgent: (state, action: PayloadAction<{ activeDate: string; date: string }>) => {
            const { activeDate: key, date } = action.payload;
            const task = state.tasks[key].find((t) => t.date === date);
            if (task) {
                task.isUrgent = !task.isUrgent;
                localStorage.setItem(LOCAL_STORAGE_TASKS, JSON.stringify(state.tasks));
            }
        },
        changeTaskTexts: (state, action: PayloadAction<ChangeTasksTextsProps>) => {
            const { body, activeDate: key, date, title } = action.payload;
            const task = state.tasks[key].find((t) => t.date === date);
            if (task) {
                task.body = body;
                task.title = title;
                localStorage.setItem(LOCAL_STORAGE_TASKS, JSON.stringify(state.tasks));
            }
        },
        deleteTask: (state, action: PayloadAction<{ activeDate: string; date: string }>) => {
            const { activeDate: key, date } = action.payload;
            const taskIndex = state.tasks[key].findIndex((t) => t.date === date);
            state.tasks[key].splice(taskIndex, 1);
            if (!state.tasks[key].length) delete state.tasks[key];
            localStorage.setItem(LOCAL_STORAGE_TASKS, JSON.stringify(state.tasks));
            if (state.isModal) {
                tasksSlice.caseReducers.closeModal(state);
            }
        },
        openModal: (state, action: PayloadAction<{ text: string; id: string }>) => {
            state.isModal = true;
            state.modalInfo = action.payload;
        },
        closeModal: (state) => {
            state.isModal = false;
            state.modalInfo = initialState.modalInfo;
        },
        setView: (state, acion: PayloadAction<TaskViews>) => {
            state.view = acion.payload;
        },
    },
});

export const { actions: tasksActions, reducer: tasksReducer } = tasksSlice;
