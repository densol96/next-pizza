import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  imageUrl: string;
  className?: string;
  alt?: string;
  size: number;
};

export const ProductImage: React.FC<Props> = ({ className, imageUrl, alt, size }) => {
  return (
    <div className={cn(className, "flex items-center justify-center flex-1 w-full")}>
      <img
        src={imageUrl}
        alt={alt}
        className={cn("relative left-2 top-2 transition-all z-10 duration-300", {
          "w-[300px] h-[300px]": size === 20,
          "w-[400px] h-[400px]": size === 30,
          "w-[500px] h-[500px]": size === 40,
        })}
      />
    </div>
  );
};
