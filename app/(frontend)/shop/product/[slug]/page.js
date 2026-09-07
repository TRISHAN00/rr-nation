const dummyProducts = {
  "rrn-runner-tee": {
    title: "RRN Runner Tee",
    price: 899,
    description:
      "Lightweight, moisture-wicking running tee designed for comfort during long runs in humid weather.",
    image: "https://cms.runrisenation.com/cms/admin/uploads/product/runner-tee.jpg",
  },
  "run-rise-cap": {
    title: "Run Rise Cap",
    price: 499,
    description: "Breathable running cap with adjustable strap and sweatband.",
    image: "https://cms.runrisenation.com/cms/admin/uploads/product/cap.jpg",
  },
  "marathon-socks": {
    title: "Marathon Socks (3 Pack)",
    price: 299,
    description: "Cushioned anti-blister running socks, pack of three.",
    image: "https://cms.runrisenation.com/cms/admin/uploads/product/socks.jpg",
  },
};

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = dummyProducts[slug] || dummyProducts["rrn-runner-tee"];

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-6">Product: {product.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div
          className="h-80 bg-gray-200 rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${product.image})` }}
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-brand text-xl font-semibold mb-4">৳ {product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button className="bg-brand text-white font-medium rounded-lg px-6 py-3">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
