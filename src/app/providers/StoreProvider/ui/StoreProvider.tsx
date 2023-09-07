import { store } from "../config/store";
import { ReactNode } from "react";

import { Provider } from "react-redux";

interface StoreProviderProps {
    children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
    return <Provider store={store}>{children}</Provider>;
};
