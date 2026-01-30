"use client";
import FillButton from "@/components/common/FillButton";
import TicketModal from "@/components/modal/TicketModal";
import { useState } from "react";
export default function FeaturedCardRight({ bgColor }) {
  const [open, setOpen] = useState(false);

  const handleAddToCart = (ticketData) => {
    console.log("Ticket added:", ticketData);
  };

  return (
    <>
      {/* Ticket Purchase form Modal */}
      <TicketModal
        isOpen={open}
        onOpenChange={setOpen}
        onAddToCart={handleAddToCart}
      />
      <div
        className="relative p-6 sm:p-8 lg:p-10 flex flex-col justify-between"
        style={{ backgroundColor: bgColor }}
      >
        {/* Divider */}
        <div className="absolute -left-2.75 lg:-top-3.75 -bottom-3.75 hidden lg:flex flex-col items-center">
          <div className="w-6 h-6 bg-[#E0F7F6] rounded-full z-10" />
          <div className="flex-1 w-1 bg-[repeating-linear-gradient(to_bottom,white_0,white_12px,transparent_12px,transparent_24px)]" />
          <div className="w-6 h-6 bg-[#E0F7F6] rounded-full z-10" />
        </div>
        {/* Price */}
        <div>
          <span className="text-white text-sm sm:text-base">BDT</span>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-white text-4xl sm:text-5xl lg:text-6xl leading-none">
              1000
            </h3>
            <span className="text-white text-xs sm:text-sm">/Person</span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 lg:mt-0">
          <FillButton
            onClick={() => setOpen(true)}
            className="w-full lg:w-auto"
          >
            Add to Ticket
          </FillButton>
        </div>
      </div>
    </>
  );
}
