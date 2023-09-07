import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "app/providers/StoreProvider";
import { format, getDate, getMonth, getYear } from "date-fns";
import { ru } from "date-fns/locale";

export const getToday = (state: RootState) => state.calendar.todayDate;
export const getMutable = (state: RootState) => state.calendar.mutableDate;
export const getActive = (state: RootState) => state.calendar.activeDate;
export const getVeiw = (state: RootState) => state.calendar.view;
export const getLook = (state: RootState) => state.calendar.look;
export const getFirstDay = (state: RootState) => state.calendar.firstDay;
export const getDateDecade = (state: RootState) => state.calendar.decade;

export const getMutableDate = createDraftSafeSelector(getMutable, (mutableDate) => ({
    month: format(new Date(mutableDate), "LLLL", { locale: ru }),
    year: getYear(new Date(mutableDate)),
    monthIndex: getMonth(new Date(mutableDate)),
    day: getDate(new Date(mutableDate)),
}));

export const getTodayDate = createDraftSafeSelector(getToday, (todayDate) => ({
    month: format(new Date(todayDate), "LLLL", { locale: ru }),
    year: getYear(new Date(todayDate)),
    monthIndex: getMonth(new Date(todayDate)),
    day: getDate(new Date(todayDate)),
}));

export const getActiveDate = createDraftSafeSelector(getActive, (activeDate) => ({
    month: format(new Date(activeDate), "LLLL", { locale: ru }),
    year: getYear(new Date(activeDate)),
    monthIndex: getMonth(new Date(activeDate)),
    day: getDate(new Date(activeDate)),
}));
