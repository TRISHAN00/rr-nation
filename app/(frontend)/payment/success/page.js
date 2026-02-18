"use client";

import { useCart } from "@/context/CartContext";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const { fetchCart } = useCart();

  useEffect(() => {
    // Refresh cart to ensure it's empty after successful order
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your registration. Your spot has been secured.
        </p>
        <Link 
          href="/" 
          className="block w-full py-3 bg-[#00a19a] text-white rounded-xl font-bold hover:bg-[#008c86] transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}