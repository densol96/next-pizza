import { Ingredient } from "@prisma/client"
import {instance as axiosInstance} from "./instance"
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Ingredient[]> => {
    return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
}