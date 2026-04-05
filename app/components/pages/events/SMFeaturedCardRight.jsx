"use client";
import FillButton from "@/app/components/common/FillButton";
import TicketModal from "@/app/components/modal/TicketModal";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function SMFeaturedCardRight({ bgColor, price, event, pak, isSoldOut }) {
  const [open, setOpen] = useState(false);
  const { addToCart } = useCart();


  const handleAddToCart = async (ticketData) => {
    try {
      // This now handles both Guest (localStorage) and User (API)
      await addToCart(ticketData);
    } catch (error) {
      console.error("Cart error:", error);
    }
  };

  const handleTicketClick = () => {
    setOpen(true);
  };

  return (
    <>
      <TicketModal
        isOpen={open}
        onOpenChange={setOpen}
        onAddToCart={handleAddToCart}
        eventTicketId={pak?.id}
        pak={pak}
      />

      <div
        className="relative p-5 sm:p-6 lg:p-4.5 flex flex-col justify-between rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none"
        style={{ backgroundColor: bgColor }}
      >
        {/* Divider logic... */}
        <div className="absolute -left-3 lg:-top-3 -bottom-3 hidden lg:flex flex-col items-center">
          <div className="w-6 h-6 bg-[#E0F7F6] rounded-full z-10" />
          <div className="flex-1 w-1 bg-[repeating-linear-gradient(to_bottom,white_0,white_12px,transparent_12px,transparent_24px)]" />
          <div className="w-6 h-6 bg-[#E0F7F6] rounded-full z-10" />
        </div>

        <div>
          <span className="text-white text-[10px] leading-[11px]">BDT</span>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl leading-8">
              {price}
            </h3>
            <span className="text-white text-xs sm:text-sm">/Person</span>
          </div>
        </div>

        <div className="mt-6 lg:mt-0">
          <FillButton
            onClick={!isSoldOut ? handleTicketClick : undefined}
            disabled={isSoldOut}
            className={`w-full lg:w-auto ${isSoldOut ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {isSoldOut ? "Sold Out" : "Add to Ticket"}
          </FillButton>
        </div>
      </div>
    </>
  );
}