"use client";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Search } from "lucide-react";

import { useClickAway } from "@/hooks/useClickAway";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const SearchInput: React.FC<Props> = ({ className, children }) => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useClickAway<HTMLDivElement>(() => setIsFocused(false));

  return (
    <>
      {isFocused && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30" />
      )}
      <div
        className={clsx(
          className,
          "flex rounded-2xl justify-between relative h-11 z-30 max-w-[50%] w-full"
        )}
        ref={ref}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-10 pl-11"
          placeholder="Найти пиццу"
          type="text"
          onFocus={() => setIsFocused(true)}
        />
      </div>
    </>
  );
};
