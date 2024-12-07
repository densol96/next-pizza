"use client";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Search } from "lucide-react";
import { useDebounce } from "react-use";
import { useClickAway } from "@/hooks/useClickAway";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const SearchInput: React.FC<Props> = ({ className, children }) => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useClickAway<HTMLDivElement>(() => setIsFocused(false));
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useDebounce(
    () => {
      Api.products.search(searchQuery).then((items: Product[]) => {
        setProducts(items);
      });
    },
    300,
    [searchQuery]
  );

  const onSelectItem = () => {
    setIsFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <>
      {isFocused && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30" />
      )}
      <div
        className={clsx(
          className,
          "flex rounded-2xl justify-between relative h-11 z-30 max-w-[50%] w-full"
        )}
        ref={ref}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-10 pl-11"
          placeholder="Найти пиццу"
          type="text"
          onFocus={() => setIsFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* SEARCH RESULTS */}
        <div
          className={cn(
            "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            isFocused && "visible opacity-100"
          )}
        >
          {products.length === 0 && (
            <p className="px-3 py-2 hover:bg-primary/10 flex items-center justify-center">
              Таких продуктов у нас нет :с
            </p>
          )}
          {products.map((product) => (
            <Link
              className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
              href={`/product/${product.id}`}
              onClick={onSelectItem}
            >
              <img
                src={product.imageUrl}
                alt="Пицца"
                className="rounded-sm h-8 w-8"
              />
              <span>{product.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
