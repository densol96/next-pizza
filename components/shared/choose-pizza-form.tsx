"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { Title, ProductImage } from "@/components/shared";
import { Button } from "@/components/ui";
import { GroupVariants } from "./group-variants";
import { pizzaTypes, pizzaSizes, mapPizzaType } from "@/lib/constants";
import { PizzaType, PizzaSize } from "@/@types/custom";
import { Ingredient } from "./ingredient";
import { Ingredient as IngredientType, ProductItem } from "@prisma/client";
import { useStoreCheckboxValues } from "@/hooks";

type Props = {
  imageUrl: string;
  name: string;
  ingredients: IngredientType[];
  productItems: ProductItem[];
  onClickAddToCart?: VoidFunction;
  className?: string;
};

export const ChoosePizzaForm: React.FC<Props> = ({ imageUrl, name, ingredients, productItems, onClickAddToCart, className }) => {
  const [size, setSize] = useState<PizzaSize>(productItems[0].size as PizzaSize);
  const [type, setType] = useState<PizzaType>(productItems[0].pizzaType as PizzaType);

  const [checkedIngredients, toggleIngredient] = useStoreCheckboxValues<number>();

  const productItemPrice: number | undefined = productItems.find((item) => item.pizzaType === type && item.size === size)?.price;
  const totalPrice =
    productItemPrice &&
    ingredients.reduce((total, ingredient) => (total += checkedIngredients.includes(ingredient.id) ? ingredient.price : 0), productItemPrice);
  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;

  const actualPizzaSizes = pizzaSizes.map((sizeVariant) =>
    productItems.find((item) => item.size === sizeVariant.value) ? { ...sizeVariant, disabled: false } : { ...sizeVariant, disabled: true }
  );

  const actualPizzaTypes = pizzaTypes.map((typeVariant) =>
    productItems.find((item) => item.pizzaType === typeVariant.value && item.size === size)
      ? { ...typeVariant, disabled: false }
      : { ...typeVariant, disabled: true }
  );

  useEffect(() => {
    if (!productItems.find((item) => item.size === size && item.pizzaType === type)) {
      setType(actualPizzaTypes.find((type) => type.disabled === false)?.value as PizzaType);
    }
  }, [size]);

  return (
    <div className={cn(className, "flex flex-1")}>
      <ProductImage imageUrl={imageUrl} alt={name} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <div className="flex flex-col gap-5 mt-5">
          <GroupVariants items={actualPizzaSizes} onClick={(value) => setSize(+value as PizzaSize)} selectedValue={size} />
          <GroupVariants items={actualPizzaTypes} onClick={(value) => setType(+value as PizzaType)} selectedValue={type} />
        </div>
        <div className="grid grid-cols-3 gap-3 bg-gray-50 p-5 rounded-md max-h-[420px] overflow-auto scrollbar">
          {ingredients.map((ingredient, i) => {
            const isChecked = checkedIngredients.includes(ingredient.id);
            return (
              <Ingredient
                active={isChecked}
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => toggleIngredient(ingredient.id)(!isChecked)}
              />
            );
          })}
        </div>
        {!totalPrice ? (
          <p className="p-5 text-sm text-center text-gray-400">
            В данный момент эта пицца недоступна!
            <br /> Попробуйте другой тип - размер! :(
          </p>
        ) : (
          <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">Добавить в корзину за {totalPrice} Р</Button>
        )}
      </div>
    </div>
  );
};
