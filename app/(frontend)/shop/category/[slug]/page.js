const dummyCategories = {
  apparel: [
    { id: 1, title: "RRN Runner Tee", price: 899 },
    { id: 2, title: "Run Rise Cap", price: 499 },
  ],
  accessories: [
    { id: 3, title: "Marathon Socks (3 Pack)", price: 299 },
    { id: 4, title: "Hydration Belt", price: 799 },
  ],
  shoes: [
    { id: 5, title: "Speed Runner Pro", price: 5499 },
    { id: 6, title: "Trail Blazer X", price: 5999 },
  ],
};

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const products = dummyCategories[slug] || [];

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-2">Category: {slug}</h1>
      <p className="text-gray-600 mb-8">Products in this category.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="rounded-2xl border border-gray-200 p-4">
            <div className="h-40 bg-gray-200 rounded-xl mb-4" />
            <h3 className="font-semibold mb-1">{product.title}</h3>
            <p className="text-brand font-medium">৳ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
