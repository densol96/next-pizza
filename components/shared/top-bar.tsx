import { cn } from "@/lib/utils";
import React from "react";

import { Categories, Container, SortPopup } from "@/components/shared";
import { Category } from "@prisma/client";

type Props = {
  items: Category[];
  className?: string;
};

export const TopBar: React.FC<Props> = ({ className, items }) => {
  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)} id="topBar">
      <Container className="flex items-center justify-between flex-wrap">
        <Categories items={items} />
        <SortPopup />
      </Container>
    </div>
  );
};
