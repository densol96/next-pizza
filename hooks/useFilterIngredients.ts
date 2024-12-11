import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react"

export function useFilterIngredients(): {ingredients: Ingredient[], isLoading: boolean} {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        Api.ingredients.getAll().then(setIngredients).finally(() => setIsLoading(false));
    }, []);
    return {ingredients, isLoading};
}