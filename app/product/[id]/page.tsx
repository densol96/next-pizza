export default function ProductPage({ params }: { params: { id: string } }) {
  const id = +params.id;

  return <p>Product: {id}</p>;
}
