"use client";

import { ArrowLeft, ShoppingCart, XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
        {/* Visual Indicator */}
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-orange-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-8">
          You have cancelled the payment process. Don't worry, your items are still safe in your cart.
        </p>

        <div className="space-y-3">
          {/* Primary Action: Go back to Checkout */}
          <Link 
            href="/events/checkout" 
            className="flex items-center justify-center w-full py-3 bg-[#00a19a] text-white rounded-xl font-bold hover:bg-[#008c86] transition-all active:scale-95"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Return to Checkout
          </Link>

          {/* Secondary Action: Go Home */}
          <Link 
            href="/" 
            className="flex items-center justify-center w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400 italic">
          If this was a mistake, you can try paying again using a different method.
        </p>
      </div>
    </div>
  );
}