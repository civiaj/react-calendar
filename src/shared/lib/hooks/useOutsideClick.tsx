import { useEffect, useRef } from "react";

/**
 * Использовать OutsideClickWrapper.tsx
 * @param callback - функция, которая закрывает диалоговое окно при клике снаружи, передать OutsideClickWrapper.tsx
 * @returns ref
 */

export function useOutsideClick(callback: () => void) {
    // eslint-disable-next-line
    const ref = useRef<any>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener("click", handleClick, true);

        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    }, [ref, callback]);

    return ref;
}
