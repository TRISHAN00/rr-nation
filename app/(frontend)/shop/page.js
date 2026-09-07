const dummyProducts = [
  {
    id: 1,
    title: "RRN Runner Tee",
    slug: "rrn-runner-tee",
    price: 899,
    image: "https://cms.runrisenation.com/cms/admin/uploads/product/runner-tee.jpg",
  },
  {
    id: 2,
    title: "Run Rise Cap",
    slug: "run-rise-cap",
    price: 499,
    image: "https://cms.runrisenation.com/cms/admin/uploads/product/cap.jpg",
  },
  {
    id: 3,
    title: "Marathon Socks (3 Pack)",
    slug: "marathon-socks",
    price: 299,
    image: "https://cms.runrisenation.com/cms/admin/uploads/product/socks.jpg",
  },
];

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-2">Shop</h1>
      <p className="text-gray-600 mb-8">All running gear, apparel & accessories.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyProducts.map((product) => (
          <div key={product.id} className="rounded-2xl border border-gray-200 p-4">
            <div
              className="h-40 bg-gray-200 rounded-xl mb-4 bg-cover bg-center"
              style={{ backgroundImage: `url(${product.image})` }}
            />
            <h3 className="font-semibold mb-1">{product.title}</h3>
            <p className="text-brand font-medium mb-4">৳ {product.price}</p>
            <button className="bg-brand text-white text-sm font-medium rounded-lg px-4 py-2">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
