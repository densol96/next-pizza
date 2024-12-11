"use client";

import React, { useEffect, useState } from "react";
import { Title, FilterCheckbox, CheckboxFilterGroup } from "@/components/shared";
import { Input, RangeSlider } from "../ui";
import { cn } from "@/lib/utils";
import { useFilterIngredients, useStoreCheckboxValues } from "@/hooks";
import qs from "qs";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};

type PriceProps = {
  priceFrom: number;
  priceTo: number;
};

type SizesProps = "10" | "20" | "30";
type BreadProps = "1" | "2";

export const Filters: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const [topBarHeight, setTopBarHeight] = useState(0);
  useEffect(() => {
    const el = document.querySelector("#topBar") as Element;
    setTopBarHeight(el.clientHeight);
  }, []);

  const { ingredients, isLoading } = useFilterIngredients();

  const [checkedIngredientsIds, toggleIngredient] = useStoreCheckboxValues<number>();
  const [sizesValues, toggleSizes] = useStoreCheckboxValues<number>();
  const [breadTypes, toggleBreads] = useStoreCheckboxValues<number>();

  const [price, setPrice] = useState<PriceProps>({ priceFrom: 0, priceTo: 1000 });
  function updatePrice(name: keyof PriceProps, value: number) {
    setPrice({
      ...price,
      [name]: value,
    });
  }

  useEffect(() => {
    const checkedFilters = {
      prices: price,
      pizzaTypes: breadTypes,
      sizes: sizesValues,
      selectedIngredients: checkedIngredientsIds,
    };
    const query = qs.stringify(checkedFilters, {
      arrayFormat: "comma",
    });
    router.push(`?${query}`, {
      scroll: false,
    });
  }, [checkedIngredientsIds, sizesValues, breadTypes, price]);

  return (
    <div style={{ top: `${topBarHeight + 10}px` }} className={cn(`self-start`, className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <CheckboxFilterGroup
            title="Тип теста"
            items={[
              { text: "Тонкое", value: "1" },
              { text: "Традиционное", value: "2" },
            ]}
            onCheckedChange={toggleBreads}
          />
        </div>
        <div className="flex flex-col gap-4">
          <CheckboxFilterGroup
            title="Размеры"
            items={[
              { text: "20 cm", value: "20" },
              { text: "30 cm", value: "30" },
              { text: "40 cm", value: "40" },
            ]}
            onCheckedChange={toggleSizes}
          />
        </div>

        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
          <p className="font-bold mb-3">Цена от и до:</p>
          <div className="flex gap-3 mb-5">
            <Input
              type="number"
              placeholder="0"
              min={0}
              max={1000}
              value={price.priceFrom}
              onChange={(e) => updatePrice("priceFrom", +e.target.value)}
            />
            <Input
              type="number"
              placeholder="1000"
              min={100}
              max={1000}
              value={price.priceTo}
              onChange={(e) => updatePrice("priceTo", +e.target.value)}
            />
          </div>
          <RangeSlider
            min={0}
            max={1000}
            step={10}
            value={[price.priceFrom, price.priceTo]}
            onValueChange={([from, to]) =>
              setPrice({ priceFrom: from, priceTo: to > 100 ? to : 100 })
            }
          />
        </div>
        <CheckboxFilterGroup
          title="Ингредиенты"
          items={ingredients.map((ingredient) => ({
            text: ingredient.name,
            value: ingredient.id,
            checked: checkedIngredientsIds.includes(ingredient.id),
          }))}
          isLoading={isLoading}
          onCheckedChange={toggleIngredient}
        />
      </div>
    </div>
  );
};
