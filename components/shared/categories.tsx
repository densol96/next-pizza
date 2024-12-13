"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { Category } from "@prisma/client";
import Link from "next/link";
import React, { MouseEvent, useRef } from "react";

interface Props {
  items: Category[];
  className?: string;
}

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

export const Categories: React.FC<Props> = ({ className, items }) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl flex-wrap", className)}>
      {items.map((category, i) => (
        <Link
          key={"top-bar-category-" + items[i].id}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            activeCategoryId === category.id && "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`#${items[i].name}`}
          onClick={customScrollTo(`#${items[i].name}`)}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};
