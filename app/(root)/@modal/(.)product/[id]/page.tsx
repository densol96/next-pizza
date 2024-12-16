import { ChooseProductModal, Container, Title } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      id: +id,
    },
    include: {
      ingredients: true,
      productItems: true,
    },
  });
  console.log(product);
  if (!product) return notFound();
  return <ChooseProductModal product={product} />;
  // return <h1>HELLO WORLD</h1>;
}