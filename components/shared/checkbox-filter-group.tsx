"use client";

import React, { useState } from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Button, Input, Skeleton } from "../ui";

type Item = FilterCheckboxProps;

type Props<T> = {
  title: string;
  items: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onCheckedChange: (T: any) => (checked: boolean) => void;
  className?: string;
  isLoading?: boolean;
};

export const CheckboxFilterGroup = <T,>({
  title,
  items,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  onCheckedChange,
  className,
  isLoading = false,
}: Props<T>) => {
  const functionalityRequired = items.length > limit;
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  let displayData = showAll
    ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase().trim()))
    : items.slice(0, limit);

  function onClick() {
    if (showAll) setSearchValue("");
    setShowAll(!showAll);
  }

  if (isLoading)
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {new Array(limit).fill(0).map((_, i) => (
          <Skeleton className="h-6 mb-5 rounded-[8px] bg-primary/15" key={i * 2} />
        ))}
        <Skeleton className="h-6 mb-5 rounded-[8px] bg-primary/15" key={limit + 1} />
      </div>
    );

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}
      <div className="flex flex-col gap-4">
        {displayData.map((item, i) => (
          <FilterCheckbox
            key={item.text}
            text={item.text}
            value={item.value}
            onCheckedChange={onCheckedChange?.(+item.value)}
            checked={item.checked}
          />
        ))}
        {functionalityRequired && (
          <div className="border-t border-t-neutral-100 mt-4 mx-auto">
            <Button variant="link" className="text-primary mt-3" onClick={onClick}>
              {showAll ? "- Скрыть" : "+ Показать все"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
