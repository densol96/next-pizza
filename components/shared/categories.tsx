"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import Link from "next/link";
import React, { MouseEvent, useRef } from "react";

interface Props {
  className?: string;
}

const cats = [
  "Пиццы",
  "Комбо",
  "Закуски",
  "Коктейли",
  "Кофе",
  "Напитки",
  "Десерты",
  "Десерты",
];

function customScrollTo(querySelector: string) {
  return function (e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const section = document.querySelector(querySelector);
    if (section) {
      const topBar = document.querySelector("#topBar") as Element;
      const { y }: { y: number } = section.getBoundingClientRect();
      const yCoord: number = y + window.scrollY;
      window.scrollTo(0, yCoord - topBar.clientHeight);
    }
  };
}

export const Categories: React.FC<Props> = ({ className }) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn(
        "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl flex-wrap",
        className
      )}
    >
      {cats.map((cat, i) => (
        <Link
          key={i}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            activeCategoryId === i + 1 &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`#${cats[i]}`}
          onClick={customScrollTo(`#${cats[i]}`)}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
};
