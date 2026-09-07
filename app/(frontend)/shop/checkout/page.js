export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-2">Checkout</h1>
      <p className="text-gray-600 mb-8">Complete your purchase below.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 p-6 space-y-4">
          <input
            placeholder="Full name"
            defaultValue="A R Khan Bappy"
            className="w-full rounded-lg border border-gray-200 px-4 py-3"
          />
          <input
            placeholder="Address"
            defaultValue="Pallabi, Mirpur, Dhaka-1216"
            className="w-full rounded-lg border border-gray-200 px-4 py-3"
          />
          <input
            placeholder="Phone"
            defaultValue="+880 1889 996 700"
            className="w-full rounded-lg border border-gray-200 px-4 py-3"
          />
        </div>

        <div className="rounded-2xl border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <p className="text-gray-600 mb-2">RRN Runner Tee — ৳ 899</p>
          <p className="text-gray-600 mb-2">Run Rise Cap — ৳ 499</p>
          <p className="text-gray-600 mb-4 border-t pt-2 mt-2">
            Subtotal: ৳ 1,398
          </p>
          <button className="w-full bg-brand text-white font-medium rounded-lg py-3">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
