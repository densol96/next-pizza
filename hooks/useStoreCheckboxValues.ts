import { useState } from "react";

export function useStoreCheckboxValues<T>(): [T[], (val: T) => (checked: boolean) => void] {
    const [list, setList] = useState<T[]>([]);  
    function toggle(val: T) {
        return (checked: boolean) =>
        checked
            ? setList((state) => [...state, val])
            : setList((state) => state.filter((item) => item !== val));
    }
    return [list, toggle];
}