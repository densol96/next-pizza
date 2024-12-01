import { cn } from "@/lib/utils";
import React from "react";

import { Categories, Container, SortPopup } from "@/components/shared";

type Props = {
  className?: string;
};

export const TopBar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "sticky top-o bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between flex-wrap">
        <Categories />
        <SortPopup />
      </Container>
    </div>
  );
};