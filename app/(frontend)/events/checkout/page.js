"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CheckoutSidebar from "./_components/CheckoutSidebar";

const getDynamicValue = (participant, fieldName) => {
  if (!participant) return null;
  if (Array.isArray(participant)) return participant.find((f) => f.name === fieldName)?.value;
  return participant[fieldName];
};

export default function EventCheckoutPage() {
  const router = useRouter();
  const [couponId, setCouponId] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [agree, setAgree] = useState(false);
  const { eventItems, eventSubtotal, handleDeleteCartItem } = useCart();

  const hasItems = eventItems.length > 0;

  return (
    <>
      <InnerBanner
        title="Event Checkout"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events" }, { label: "Checkout" }]}
      />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          {/* LEFT: Event Cart Items */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold text-[#001819] mb-4">
              Event Tickets ({eventItems.length})
            </h1>

            {!hasItems && (
              <div className="bg-white p-8 rounded-lg border text-center">
                <p className="text-gray-500 text-lg">No event tickets in your cart.</p>
                <button onClick={() => router.push("/events")} className="mt-3 text-[#00a19a] font-semibold hover:underline">
                  Browse Events
                </button>
              </div>
            )}

            {eventItems.map((item, index) => {
              const pData = item.formData;
              return (
                <div key={item.id || index} className="border rounded-lg bg-white overflow-hidden shadow-sm">
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
                        title="Remove"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                    {Array.isArray(pData) ? (
                      pData.map((field, fIdx) => (
                        <Detail key={fIdx} label={field.name.replace(/_/g, " ")} value={field.value} />
                      ))
                    ) : (
                      Object.entries(pData || {}).map(([key, val], fIdx) => {
                        if (["tempId", "pak", "distance_category"].includes(key)) return null;
                        return <Detail key={fIdx} label={key.replace(/_/g, " ")} value={val} />;
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Summary, Coupon & Pay (existing sidebar handles all) */}
          <CheckoutSidebar
            cartData={{ items: eventItems, totalAmount: eventSubtotal }}
            discount={discount}
            setDiscount={setDiscount}
            couponId={couponId}
            setCouponId={setCouponId}
            agree={agree}
            setAgree={setAgree}
          />
        </div>
      </div>
    </>
  );
}

function Detail({ label, value, fullWidth = false }) {
  if (!value || (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0)) return null;

  let displayValue = value;
  if (Array.isArray(value)) displayValue = value.join(", ");

  const isImage = typeof value === "string" && (
    value.startsWith("http") &&
    (value.match(/\.(jpeg|jpg|gif|png|webp)$/i) || value.includes("/media/"))
  );

  return (
    <div className={`flex flex-col ${fullWidth ? "md:col-span-2 lg:col-span-3" : ""}`}>
      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{label.replace(/-/g, " ")}</span>
      {isImage ? (
        <div className="mt-1 relative h-14 w-14 rounded border border-gray-200 overflow-hidden bg-gray-50">
          <img
            src={value}
            alt={label}
            className="h-full w-full object-cover cursor-zoom-in hover:scale-110 transition-transform"
            onClick={() => window.open(value, "_blank")}
          />
        </div>
      ) : (
        <span className="text-gray-800 font-medium break-all">{displayValue.toString()}</span>
      )}
    </div>
  );
}
