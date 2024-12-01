import {
  Categories,
  Container,
  Title,
  TopBar,
  Filters,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="pb-14 mt-10">
        <div className="flex gap-[60px]">
          <Filters className="w-[250px]" />
          {/* Продукты */}
          <div className="flex-1"></div>
        </div>
      </Container>
    </>
  );
}
