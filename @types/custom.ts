import { mapPizzaType, mapPizzaSize } from "@/lib/constants";

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;
