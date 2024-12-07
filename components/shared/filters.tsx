"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Title,
  FilterCheckbox,
  CheckboxFilterGroup,
} from "@/components/shared";
import { Input, RangeSlider } from "../ui";
import { FilterCheckboxProps } from "./filter-checkbox";
import { cn } from "@/lib/utils";
type Props = {
  className?: string;
};

export const Filters: React.FC<Props> = ({ className }) => {
  const [topBarHeight, setTopBarHeight] = useState(0);

  useEffect(() => {
    const el = document.querySelector("#topBar") as Element;
    setTopBarHeight(el.clientHeight);
  }, []);

  return (
    <div
      style={{ top: `${topBarHeight + 10}px` }}
      className={cn(`sticky self-start`, className)}
    >
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Можно собирать" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
          />
          <Input type="number" placeholder="1000" min={100} max={1000} />
        </div>
        <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
      </div>
      <CheckboxFilterGroup
        title="Ингредиенты"
        items={
          [
            { text: "One" },
            { text: "Two" },
            { text: "Three" },
            { text: "Four" },
            { text: "Five" },
            { text: "Six" },
            { text: "Seven" },
            { text: "Eight" },
          ] as FilterCheckboxProps[]
        }
      />
    </div>
  );
};
