"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import CheckoutSidebar from "./_components/CheckoutSidebar";

/**
 * Unified helper to get values from dynamic participant data.
 * Handles both API Array format and Guest Object format.
 */
const getDynamicValue = (participant, fieldName) => {
  if (!participant) return null;
  if (Array.isArray(participant)) {
    return participant.find((f) => f.name === fieldName)?.value;
  }
  return participant[fieldName];
};

export default function CheckoutPage() {
  const [couponId, setCouponId] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [agree, setAgree] = useState(false);
  const { cartData, handleDeleteCartItem } = useCart();

  // Use the totalAmount provided by context/API or calculate locally
  const totalSum = cartData?.items?.reduce((acc, item) => {
    const price = parseFloat(item?.unitPrice || item?.package?.price) || 0;
    const qty = parseInt(item?.quantity) || 0;
    return acc + (price * qty);
  }, 0) || 0;

  return (
    <>
      <InnerBanner
        title="Checkout"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Checkout" }]}
      />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: Dynamic Cart Items */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold text-[#001819] mb-4">
              Your Cart ({cartData?.items?.length || 0})
            </h1>

            {cartData?.items?.length === 0 && (
              <div className="bg-white p-8 rounded-lg border text-center">
                <p className="text-gray-500 text-lg">Your cart is empty.</p>
              </div>
            )}

            {cartData?.items?.map((item, index) => (
              <div
                key={item.id || index}
                className="border rounded-lg bg-white overflow-hidden shadow-sm"
              >
                {/* Header: Ticket Type & Price */}
                <div className="bg-[#f8f9fa] px-4 py-3 border-b flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#001819] text-lg">
                      {item?.package?.name || item?.eventTicket?.name}
                    </p>
                    <p className="text-sm font-semibold text-[#00a19a]">
                      Distance: {getDynamicValue(item.participant, "distance_category") || item.package?.distance || "Standard"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-xl text-[#001819]">
                      ৳ {(Number(item.unitPrice) || Number(item.package?.price) || 0).toLocaleString()}
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

                {/* Body: Render Dynamic Participant Fields */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                  {Array.isArray(item.formData) ? (
                    // Logic for API Data (Array)
                    item.formData.map((field, fIdx) => (
                      <Detail 
                        key={fIdx} 
                        label={field.name.replace(/_/g, ' ')} 
                        value={field.value} 
                      />
                    ))
                  ) : (
                    // Logic for Guest Data (Object)
                    Object.entries(item.formData || {}).map(([key, val], fIdx) => {
                      if (["tempId", "pak", "distance_category"].includes(key)) return null;
                      return (
                        <Detail 
                          key={fIdx} 
                          label={key.replace(/_/g, ' ')} 
                          value={val} 
                        />
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Summary & Coupon */}
          <CheckoutSidebar
            cartData={cartData}
            discount={discount}
            setDiscount={setDiscount}
            couponId={couponId}
            setCouponId={setCouponId}
            agree={agree}
            setAgree={setAgree}
            totalSum={totalSum}
          />
        </div>
      </div>
    </>
  );
}

function Detail({ label, value, fullWidth = false }) {
  // 1. Return null for empty values or empty objects
  if (!value || (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)) return null;

  // 2. Handle Checkbox/Array values (join them with commas)
  let displayValue = value;
  if (Array.isArray(value)) {
    displayValue = value.join(", ");
  }

  // 3. Check if the value is an Image URL
  const isImage = typeof value === "string" && (
    value.startsWith("http") && 
    (value.match(/\.(jpeg|jpg|gif|png|webp)$/i) || value.includes("/media/"))
  );

  return (
    <div className={`flex flex-col ${fullWidth ? "md:col-span-2 lg:col-span-3" : ""}`}>
      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
        {label.replace(/-/g, ' ')}
      </span>
      
      {isImage ? (
        <div className="mt-1 relative h-14 w-14 rounded border border-gray-200 overflow-hidden bg-gray-50">
          <img 
            src={value} 
            alt={label} 
            className="h-full w-full object-cover cursor-zoom-in hover:scale-110 transition-transform"
            onClick={() => window.open(value, '_blank')}
          />
        </div>
      ) : (
        <span className="text-gray-800 font-medium wrap-break-word">
          {displayValue.toString()}
        </span>
      )}
    </div>
  );
}