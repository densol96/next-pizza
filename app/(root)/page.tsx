import { Categories, Container, Title, TopBar, Filters } from "@/components/shared";
import { ProductCard } from "@/components/shared/product-card";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          productItems: true,
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      {/* PRODUCT NAVIGATION */}
      <TopBar items={categories} />

      {/* PRODUCT GROUPS */}
      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          <Filters className="w-[250px]" />
          {/* Продукты */}
          <div className="flex-1 ">
            {categories.map((category) => (
              <ProductsGroupList title={category.name} categoryId={category.id} items={category.products} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
