import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react"

export function useIngredients(): Ingredient[] {

    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        Api.ingredients.getAll().then(setIngredients);
    }, []);

    return ingredients;
}