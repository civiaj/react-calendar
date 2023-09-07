import { ReactNode } from "react";
import { useOutsideClick } from "shared/lib/hooks/useOutsideClick";

interface OutsideClickWrapperProps {
    callback: () => void;
    children: ReactNode;
}

export const OutsideClickWrapper = (props: OutsideClickWrapperProps) => {
    const { callback, children } = props;
    const ref = useOutsideClick(() => callback());

    return <span ref={ref}>{children}</span>;
};
