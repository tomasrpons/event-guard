import { useEffect, useRef } from "react";

export const usePrevious = (value: number) => {
    const ref = useRef<number>(value);

    useEffect(() => {
        if (ref.current) {
            ref.current = value;
        }
    }, [value]);

    return ref.current;
};
