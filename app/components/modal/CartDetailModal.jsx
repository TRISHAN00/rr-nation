"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CartDetailModal({ open, onClose, cartData }) {
  if (!open) return null;

  const router = useRouter();

  const { handleDeleteCartItem } = useCart();

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const hasItems = cartData?.items?.length > 0;

  const handleCheckout = () => {
    onClose();
    router.push("/events/checkout"); // ✅ navigate
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-xl bg-[#fafafa] shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-xl bg-[#00a19a] px-6 py-4 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-white" size={20} />
            <h2 className="text-lg font-semibold text-white">Cart Details</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {!hasItems ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Your cart is currently empty.</p>
            </div>
          ) : (
            cartData?.items?.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-[#001819]/10 bg-white p-4 space-y-4 shadow-sm"
              >
                {/* Event Info */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-[#001819] text-lg">
                      {item.eventTicket.name}
                    </p>
                    <p className="text-sm font-medium text-[#00a19a]">
                      Distance: {item.eventTicket.distance}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#001819]">
                      ৳ {parseFloat(item.totalPrice).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>

                {/* Participant Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 text-sm text-[#001819] bg-[#fafafa] p-4 rounded-md border border-[#001819]/5">
                  {/* Primary Information */}
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider opacity-60 font-bold">
                      Name
                    </span>
                    <span className="font-medium">{item.participant.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider opacity-60 font-bold">
                      Email
                    </span>
                    <span
                      className="font-medium truncate"
                      title={item.participant.email}
                    >
                      {item.participant.email || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider opacity-60 font-bold">
                      Contact Number
                    </span>
                    <span className="font-medium">
                      {item.participant.contactNumber}
                    </span>
                  </div>

                  {/* Category & Status */}
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider opacity-60 font-bold">
                      Age Category
                    </span>
                    <span className="font-medium">
                      {item.participant.ageCategory}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider opacity-60 font-bold">
                      Runner Category
                    </span>
                    <span className="font-medium">
                      {item.participant.runnerCategory}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider opacity-60 font-bold">
                      Gender
                    </span>
                    <span className="font-medium">
                      {item.participant.gender}
                    </span>
                  </div>

                  {/* Personal Details */}
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider opacity-60 font-bold">
                      Date of Birth
                    </span>
                    <span className="font-medium">
                      {item.participant.dateOfBirth}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider opacity-60 font-bold">
                      Blood Group
                    </span>
                    <span className="font-medium">
                      {item.participant.bloodGroup || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider opacity-60 font-bold">
                      T-Shirt Size
                    </span>
                    <span className="font-medium">
                      {item.participant.tshirtSize}
                    </span>
                  </div>

                  {/* Community & Emergency (Span full width on mobile for readability) */}
                  <div className="flex flex-col sm:col-span-2 lg:col-span-1">
                    <span className="text-[10px] uppercase tracking-wider opacity-60 font-bold">
                      Community Name
                    </span>
                    <span className="font-medium">
                      {item.participant.communityName || "None"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:col-span-1">
                    <span className="text-[10px] uppercase tracking-wider opacity-60 font-bold">
                      Emergency Contact
                    </span>
                    <span className="font-medium">
                      {item.participant.emergencyContactName} (
                      {item.participant.emergencyContactNumber})
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t border-[#001819]/10 pt-3">
                  <button
                    onClick={() => handleDeleteCartItem(item?.id)}
                    className="flex items-center gap-1 rounded-md border border-red-500/40 px-3 py-1.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total Summary & Footer */}
        <div className="border-t border-[#001819]/10 bg-white px-6 py-4 shrink-0 rounded-b-xl">
          {hasItems && (
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-gray-600 font-medium">Total Amount</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#00a19a]">
                  ৳ {parseFloat(cartData.totalAmount).toLocaleString()}
                </span>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                  Inclusive of all taxes
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-lg border border-[#001819]/20 px-4 py-2 text-sm font-medium text-[#001819] hover:bg-[#001819]/5 transition-colors"
            >
              Back to Events
            </button>
            <button
              onClick={handleCheckout}
              disabled={!hasItems}
              className="rounded-lg bg-[#00a19a] px-8 py-2 text-sm font-semibold text-white disabled:bg-gray-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
