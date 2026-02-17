"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [agree, setAgree] = useState(false);
  const { cartData, handleDeleteCartItem } = useCart();

  return (
    <>
      <InnerBanner
        title="Checkout"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Checkout" }]}
      />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto flex flex-col lg:flex-row gap-8">
          {/* LEFT: Cart Items */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold text-[#001819] mb-4">
              Your Cart ({cartData?.items?.length || 0})
            </h1>

            {cartData?.items?.length === 0 && (
              <div className="bg-white p-8 rounded-lg border text-center">
                <p className="text-gray-500 text-lg">Your cart is empty.</p>
              </div>
            )}

            {cartData?.items?.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg bg-white overflow-hidden shadow-sm"
              >
                {/* Header: Ticket Type & Price */}
                <div className="bg-[#f8f9fa] px-4 py-3 border-b flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#001819] text-lg">
                      {item.eventTicket.name}
                    </p>
                    <p className="text-sm font-semibold text-[#00a19a]">
                      Distance: {item.participant.distanceCategory}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-xl text-[#001819]">
                      ৳ {item.totalPrice}
                    </p>
                    <button
                      onClick={() => handleDeleteCartItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Body: Full Participant Details */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-sm">
                  <Detail label="Name" value={item.participant.name} />
                  <Detail label="Email" value={item.participant.email} />
                  <Detail label="Contact" value={item.participant.contactNumber} />
                  <Detail label="Age Category" value={item.participant.ageCategory} />
                  <Detail label="Runner Category" value={item.participant.runnerCategory} />
                  <Detail label="Gender" value={item.participant.gender} />
                  <Detail label="Date of Birth" value={item.participant.dateOfBirth} />
                  <Detail label="Blood Group" value={item.participant.bloodGroup} />
                  <Detail label="T-shirt Size" value={item.participant.tshirtSize} />
                  <Detail label="Community" value={item.participant.communityName} />
                  <Detail 
                    label="Emergency Contact" 
                    value={`${item.participant.emergencyContactName} (${item.participant.emergencyContactNumber})`} 
                    fullWidth
                  />
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Summary & Coupon (Sticky) */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="sticky top-24 rounded-xl border bg-white p-6 shadow-md space-y-5">
              <h2 className="text-xl font-bold text-[#001819] border-b pb-3">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">৳ {cartData?.totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="font-medium text-red-500">- ৳ {discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-[#00a19a] text-xl pt-2 border-t">
                  <span>Total</span>
                  <span>৳ {cartData?.totalAmount}</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-[#00a19a] outline-none"
                />
                <button
                  className="rounded-lg bg-[#001819] px-4 py-2 text-white text-sm font-semibold hover:bg-black transition-colors"
                >
                  Apply
                </button>
              </div>

              {/* Agree Terms */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#00a19a] focus:ring-[#00a19a]"
                  />
                  <span className="text-xs text-gray-600 leading-tight">
                    I have read and agree to the website{" "}
                    <a href="#" className="text-[#00a19a] font-bold underline">
                      terms and conditions
                    </a>{" "}
                    and event regulations.
                  </span>
                </label>
              </div>

              {/* Checkout Button */}
              <button
                className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all ${
                  cartData?.items?.length === 0 || !agree
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#00a19a] hover:bg-[#008c86] active:scale-[0.98]"
                }`}
                disabled={cartData?.items?.length === 0 || !agree}
              >
                Confirm & Pay ৳ {cartData?.totalAmount}
              </button>
              
              <p className="text-[10px] text-center text-gray-400">
                Secure SSL Encrypted Payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Helper Component for cleaner code
function Detail({ label, value, fullWidth = false }) {
  if (!value) return null;
  return (
    <div className={`flex flex-col mb-1 ${fullWidth ? "md:col-span-2 lg:col-span-3" : ""}`}>
      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
        {label}
      </span>
      <span className="text-gray-800 font-medium">{value}</span>
    </div>
  );
}