import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStoreCheckboxValues } from "@/hooks";
import qs from "qs";

type PriceProps = {
  priceFrom?: number;
  priceTo?: number;
};

type QueryFilters = PriceProps & {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
};

type SizesProps = 20 | 30 | 40;
type PizzaTypesProps = 1 | 2;

export function useFilters() {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
  const router = useRouter();

  const [checkedIngredientsIds, toggleIngredient] = useStoreCheckboxValues<number>(
    searchParams
      .get("ingredients")
      ?.split(",")
      .map((idString) => +idString)
  );
  const [sizesValues, toggleSizes] = useStoreCheckboxValues<SizesProps>(
    searchParams
      .get("sizes")
      ?.split(",")
      .map((idString) => +idString as SizesProps)
  );
  const [pizzaTypes, toggleTypes] = useStoreCheckboxValues<PizzaTypesProps>(
    searchParams
      .get("pizzaTypes")
      ?.split(",")
      .map((idString) => +idString as PizzaTypesProps)
  );

  const [price, setPrice] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  function updatePrice(name: keyof PriceProps, value: number) {
    setPrice({
      ...price,
      [name]: value,
    });
  }

  useEffect(() => {
    const checkedFilters = {
      ...price,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(sizesValues),
      ingredients: Array.from(checkedIngredientsIds),
    };
    const query = qs.stringify(checkedFilters, {
      arrayFormat: "comma",
    });
    router.push(`?${query}`, {
      scroll: false,
    });
  }, [checkedIngredientsIds, sizesValues, pizzaTypes, price]);

  return { checkedIngredientsIds, toggleIngredient, sizesValues, toggleSizes, pizzaTypes, toggleTypes, price, updatePrice, setPrice };
}
