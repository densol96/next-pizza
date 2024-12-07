"use client";

import React, { useState } from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Button, Input } from "../ui";

type Item = FilterCheckboxProps;

type Props = {
  title: string;
  items: Item[];
  // defaultValues?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
  className?: string;
};

export const CheckboxFilterGroup: React.FC<Props> = ({
  title,
  items,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  onChange,
  defaultValue,
  className,
}) => {
  const functionalityRequired = items.length > 5;
  const [showAll, setShowAll] = useState<boolean>(!functionalityRequired);
  const [searchValue, setSearchValue] = useState<string>("");

  let displayData = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase().trim())
      )
    : items.slice(0, limit);

  function onClick() {
    if (showAll) setSearchValue("");
    setShowAll(!showAll);
  }

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
          <FilterCheckbox key={item.text} text={item.text} value={`${i + 1}`} />
        ))}
        {functionalityRequired && (
          <div className="border-t border-t-neutral-100 mt-4 mx-auto">
            <Button
              variant="link"
              className="text-primary mt-3"
              onClick={onClick}
            >
              {showAll ? "- Скрыть" : "+ Показать все"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
