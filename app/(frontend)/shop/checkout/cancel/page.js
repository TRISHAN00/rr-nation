"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function ShopCheckoutCancelPage() {
  return (
    <>
      <InnerBanner title="Payment Cancelled" />
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <XCircle className="text-red-500 mx-auto mb-6" size={72} />
          <h1 className="text-3xl font-bold text-[#001819] mb-3">Payment Cancelled</h1>
          <p className="text-gray-600 mb-2">You cancelled the payment process.</p>
          <p className="text-gray-500 text-sm mb-8">
            Don&apos;t worry — your cart items are still there. You can return to checkout and try again.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/shop/checkout"
              className="w-full sm:w-auto rounded-xl bg-[#00a19a] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/20 hover:bg-[#008c86] active:scale-95 transition-all text-center"
            >
              Return to Checkout
            </Link>
            <Link
              href="/shop/orders"
              className="w-full sm:w-auto rounded-xl border border-[#00a19a] px-8 py-3 text-sm font-bold text-[#00a19a] hover:bg-[#00a19a]/5 transition-all text-center"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
