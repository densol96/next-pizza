import {
  Categories,
  Container,
  Title,
  TopBar,
  Filters,
} from "@/components/shared";
import { ProductCard } from "@/components/shared/product-card";
import { ProductsGroupList } from "@/components/shared/products-group-list";

const cats = [
  "Пиццы",
  "Комбо",
  "Закуски",
  "Коктейли",
  "Кофе",
  "Напитки",
  "Десерты",
  "Десерты",
];

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          <Filters className="w-[250px]" />
          {/* Продукты */}
          <div className="flex-1 ">
            <ProductsGroupList
              title="Пиццы"
              categoryId={1}
              items={[
                {
                  id: 1,
                  name: "Супер-пицца",
                  price: 550,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/11EF8537F2244E8CAEB7C69E644D0537.avif",
                },
                {
                  id: 2,
                  name: "Супер-пицца",
                  price: 550,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/11EF8537F2244E8CAEB7C69E644D0537.avif",
                },
                {
                  id: 3,
                  name: "Супер-пицца",
                  price: 550,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/11EF8537F2244E8CAEB7C69E644D0537.avif",
                },
                {
                  id: 4,
                  name: "Супер-пицца",
                  price: 550,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/11EF8537F2244E8CAEB7C69E644D0537.avif",
                },
                {
                  id: 5,
                  name: "Супер-пицца",
                  price: 550,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/11EF8537F2244E8CAEB7C69E644D0537.avif",
                },
              ]}
            />
            <ProductsGroupList
              title="Комбо"
              categoryId={2}
              items={[
                {
                  id: 1,
                  name: "Супер-пицца",
                  price: 550,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/11EF8537F2244E8CAEB7C69E644D0537.avif",
                },
                {
                  id: 2,
                  name: "Супер-пицца",
                  price: 550,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/11EF8537F2244E8CAEB7C69E644D0537.avif",
                },
                {
                  id: 3,
                  name: "Супер-пицца",
                  price: 550,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/11EF8537F2244E8CAEB7C69E644D0537.avif",
                },
                {
                  id: 4,
                  name: "Супер-пицца",
                  price: 550,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/11EF8537F2244E8CAEB7C69E644D0537.avif",
                },
                {
                  id: 5,
                  name: "Супер-пицца",
                  price: 550,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/11EF8537F2244E8CAEB7C69E644D0537.avif",
                },
              ]}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
