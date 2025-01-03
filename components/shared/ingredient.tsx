import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";

type Props = {
  className?: string;
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
};

export const Ingredient: React.FC<Props> = ({ className, onClick, imageUrl, name, price, active }) => {
  return (
    <div
      className={cn(className, "flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white", {
        "border border-primary": active,
      })}
      onClick={onClick}
    >
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <img src={imageUrl} width={110} height={110} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price}</span>
    </div>
  );
};
