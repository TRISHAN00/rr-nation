"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CartDetailModal({ open, onClose, cartData }) {
  const router = useRouter();
  const { handleDeleteCartItem } = useCart();

  // Handle Scroll Lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  if (!open) return null;

  const hasItems = cartData?.items?.length > 0;

  const handleCheckout = () => {
    onClose();
    router.push("/events/checkout");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      {/* Container - Bottom sheet on mobile, centered modal on desktop */}
      <div className="w-full sm:max-w-3xl lg:max-w-4xl rounded-t-2xl sm:rounded-xl bg-[#fafafa] shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
        
        {/* Header - Fixed */}
        <div className="flex items-center justify-between rounded-t-2xl sm:rounded-t-xl bg-[#00a19a] px-5 py-4 sm:px-6 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-white" size={20} />
            <h2 className="text-base sm:text-lg font-semibold text-white">Cart Details</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
          {!hasItems ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-gray-400" size={30} />
              </div>
              <p className="text-gray-500 font-medium">Your cart is currently empty.</p>
            </div>
          ) : (
            cartData?.items?.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 space-y-4 shadow-sm"
              >
                {/* Event & Price Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-[#001819] text-base sm:text-lg leading-tight">
                      {item.eventTicket.name}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-[#00a19a] mt-1">
                      Distance: {item.eventTicket.distance}
                    </p>
                  </div>
                  <div className="flex sm:flex-col justify-between items-center sm:items-end">
                    <p className="font-bold text-[#001819] text-lg sm:text-xl">
                      ৳ {parseFloat(item.totalPrice).toLocaleString()}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                {/* Participant Data Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 text-sm bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <DataField label="Name" value={item.participant.name} />
                  <DataField label="Email" value={item.participant.email} isTruncated />
                  <DataField label="Contact" value={item.participant.contactNumber} />
                  <DataField label="Age Category" value={item.participant.ageCategory} />
                  <DataField label="Runner Type" value={item.participant.runnerCategory} />
                  <DataField label="Gender" value={item.participant.gender} />
                  <DataField label="Date of Birth" value={item.participant.dateOfBirth} />
                  <DataField label="Blood Group" value={item.participant.bloodGroup} />
                  <DataField label="T-Shirt Size" value={item.participant.tshirtSize} />
                  
                  <div className="col-span-2 lg:col-span-1">
                    <DataField label="Community" value={item.participant.communityName || "None"} />
                  </div>
                  <div className="col-span-2">
                    <DataField 
                      label="Emergency Contact" 
                      value={`${item.participant.emergencyContactName} (${item.participant.emergencyContactNumber})`} 
                    />
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleDeleteCartItem(item?.id)}
                    className="flex items-center gap-2 rounded-lg border border-red-100 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 hover:border-red-200 transition-all uppercase tracking-wider"
                  >
                    <Trash2 size={14} /> Remove Item
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer - Fixed */}
        <div className="border-t border-gray-200 bg-white px-5 py-4 sm:px-6 shrink-0 sm:rounded-b-xl">
          {hasItems && (
            <div className="flex items-center justify-between mb-5">
              <span className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Amount</span>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-black text-[#00a19a]">
                  ৳ {parseFloat(cartData.totalAmount).toLocaleString()}
                </span>
                <p className="text-[10px] text-gray-400 font-medium">Inclusive of all taxes</p>
              </div>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto rounded-xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Back to Events
            </button>
            <button
              onClick={handleCheckout}
              disabled={!hasItems}
              className="w-full sm:w-auto rounded-xl bg-[#00a19a] px-10 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all disabled:bg-gray-200 disabled:shadow-none"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for clean data rendering
function DataField({ label, value, isTruncated = false }) {
  return (
    <div className="flex flex-col overflow-hidden">
      <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">
        {label}
      </span>
      <span className={`font-semibold text-[#001819] text-xs sm:text-sm ${isTruncated ? 'truncate' : 'break-words'}`} title={isTruncated ? value : ""}>
        {value || "N/A"}
      </span>
    </div>
  );
}