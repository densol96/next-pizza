"use client";

import React, { useRef } from "react";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { useCategoryStore } from "@/store/category";
import { useInView } from "react-intersection-observer";

type Props = {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
};

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  categoryId,
  className,
  listClassName,
}) => {
  const intersectionRef = useRef(null);
  //   const intersection = useIntersection();
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const { ref, inView, entry } = useInView({
    threshold: 0.4,
    triggerOnce: false,
    onChange(inView, entry) {
      if (inView) {
        setActiveCategoryId(categoryId);
      }
    },
  });

  return (
    <div ref={ref} className={className} id={title}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items?.[0]?.price || product?.prie}
          />
        ))}
      </div>
    </div>
  );
};
