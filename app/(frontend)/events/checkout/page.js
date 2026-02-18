"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import CheckoutSidebar from "./_components/CheckoutSidebar";

export default function CheckoutPage() {
  const [coupon, setCoupon] = useState("");
  const [couponId, setCouponId] = useState(null); // Add this state
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
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
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
                  <Detail
                    label="Contact"
                    value={item.participant.contactNumber}
                  />
                  <Detail
                    label="Age Category"
                    value={item.participant.ageCategory}
                  />
                  <Detail
                    label="Runner Category"
                    value={item.participant.runnerCategory}
                  />
                  <Detail label="Gender" value={item.participant.gender} />
                  <Detail
                    label="Date of Birth"
                    value={item.participant.dateOfBirth}
                  />
                  <Detail
                    label="Blood Group"
                    value={item.participant.bloodGroup}
                  />
                  <Detail
                    label="T-shirt Size"
                    value={item.participant.tshirtSize}
                  />
                  <Detail
                    label="Community"
                    value={item.participant.communityName}
                  />
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
          <CheckoutSidebar
            cartData={cartData}
            discount={discount}
            setDiscount={setDiscount}
            couponId={couponId} // Pass down
            setCouponId={setCouponId} // Pass down
            agree={agree}
            setAgree={setAgree}
          />
        </div>
      </div>
    </>
  );
}

// Helper Component for cleaner code
function Detail({ label, value, fullWidth = false }) {
  if (!value) return null;
  return (
    <div
      className={`flex flex-col mb-1 ${fullWidth ? "md:col-span-2 lg:col-span-3" : ""}`}
    >
      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
        {label}
      </span>
      <span className="text-gray-800 font-medium">{value}</span>
    </div>
  );
}
