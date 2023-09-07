export interface Task {
    date: string;
    title: string;
    body: string;
    isDone: boolean;
    isUrgent: boolean;
}

export interface Tasks {
    [key: string]: Task[];
}

export type TaskViews = "day" | "month" | "year" | "all";

export interface TasksSchema {
    tasks: Tasks;
    isAdding: boolean;
    isOpen: boolean;
    isModal: boolean;
    modalInfo: { text: string; id: string };
    view: TaskViews;
}

export interface AddNewTaskProps {
    body: string;
    title: string;
    isUrgent: boolean;
    activeDate: string;
}

export interface ChangeTasksTextsProps {
    title: string;
    body: string;
    activeDate: string;
    date: string;
}
