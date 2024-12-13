import { Container, Title } from "@/components/shared";
import { GroupVariants } from "@/components/shared/group-variants";
import { ProductImage } from "@/components/shared/product-image";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
export default async function ProductPage({ params }: { params: { id: string } }) {
  const id = +params.id;
  const product = await prisma.product.findFirst({ where: { id } });

  if (!product) notFound();

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} alt="Some pizza" size={20} />

        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae numquam ea et deserunt voluptas iusto accusamus quam ut fugiat quasi,
            mollitia, voluptates corrupti ad doloribus! Quam hic minus sit minima.
          </p>
          <GroupVariants
            selectedValue="2"
            items={[
              { name: "Маленькая", value: "1" },
              { name: "Средняя", value: "2" },
              { name: "Большая", value: "3", disabled: true },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
