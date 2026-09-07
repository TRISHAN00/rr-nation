export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold mb-4">Order Successful</h1>
      <p className="text-gray-600 mb-2">Thank you for your purchase!</p>
      <p className="text-gray-600 mb-8">
        Order ID: #RRN-2026-0001 — A confirmation email has been sent.
      </p>
      <button className="bg-brand text-white font-medium rounded-lg px-6 py-3">
        Continue Shopping
      </button>
    </div>
  );
}
