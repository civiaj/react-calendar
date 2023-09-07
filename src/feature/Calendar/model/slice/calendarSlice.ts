import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Calendar, View } from "../../model/types/calendar";
import add from "date-fns/add";
import { getDecade, setMonth, setYear } from "date-fns";

const initDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
).toUTCString();
const decade = getDecade(new Date());

const initialState: Calendar = {
    activeDate: initDate,
    mutableDate: initDate,
    todayDate: initDate,
    view: "days",
    firstDay: 1,
    look: "short",
    decade,
};

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        changeMonth: (state, action: PayloadAction<number>) => {
            const date = new Date(state.mutableDate);
            state.mutableDate = add(date, { months: action.payload }).toUTCString();
        },
        setMonth: (state, action: PayloadAction<number>) => {
            const date = new Date(state.mutableDate);
            state.mutableDate = setMonth(date, action.payload).toUTCString();
        },
        changeYear: (state, action: PayloadAction<number>) => {
            const date = new Date(state.mutableDate);
            state.mutableDate = add(date, { years: action.payload }).toUTCString();
        },
        setYear: (state, action: PayloadAction<number>) => {
            const date = new Date(state.mutableDate);
            state.mutableDate = setYear(date, action.payload).toUTCString();
        },
        changeDecade: (state, action: PayloadAction<"increase" | "decrease">) => {
            state.decade = action.payload === "increase" ? state.decade + 10 : state.decade - 10;
        },
        setActiveDate: (state, action: PayloadAction<string>) => {
            state.activeDate = action.payload;
        },
        setView: (state, aciton: PayloadAction<View>) => {
            state.view = aciton.payload;
        },
        setToday: (state) => {
            state.mutableDate = state.todayDate;
            state.activeDate = state.todayDate;
            state.decade = initialState.decade;
            state.view = "days";
        },
        setDateFromTasks: (state, action) => {
            state.activeDate = action.payload;
            state.mutableDate = action.payload;
        },
    },
});

export const { actions: calendarActions, reducer: calendarReducer } = calendarSlice;
