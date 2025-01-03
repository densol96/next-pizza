"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";

import { Dialog, DialogContent } from "@/components/ui";
import { ChoosePizzaForm, ChooseProductForm } from "@/components/shared";

import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/@types/prisma";

type Props = {
  className?: string;
  product: ProductWithRelations;
};

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.productItems?.[0].pizzaType);
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden")}>
        {isPizzaForm ? (
          <ChoosePizzaForm productItems={product.productItems} imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
