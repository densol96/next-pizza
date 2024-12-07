import { MutableRefObject, useEffect, useRef } from "react";

export function useClickAway<T extends HTMLElement>(onOutsideClick: () => void): MutableRefObject<T | null> {
  const searchBarReference = useRef<T | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!searchBarReference.current?.contains(e.target as HTMLElement)) {
        onOutsideClick();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });

  return searchBarReference;
}
