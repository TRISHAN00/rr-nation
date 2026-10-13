"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <>
      <InnerBanner title="Order Confirmed" />
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <CheckCircle className="text-[#00a19a] mx-auto mb-6" size={72} />
          <h1 className="text-3xl font-bold text-[#001819] mb-3">Thank You!</h1>
          <p className="text-gray-600 mb-2">Your order has been placed successfully.</p>
          <p className="text-gray-500 text-sm mb-8">A confirmation email has been sent to your email address.</p>
          <Link href="/" className="inline-block rounded-xl bg-[#00a19a] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/20 hover:bg-[#008c86] active:scale-95 transition-all">
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
