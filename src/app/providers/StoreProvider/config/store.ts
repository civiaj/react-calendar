import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "feature/Tasks";
import { calendarReducer } from "feature/Calendar";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        calendar: calendarReducer,
    },
});
