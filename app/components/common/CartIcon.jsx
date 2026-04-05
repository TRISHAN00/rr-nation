import { ShoppingBag } from "lucide-react";

export default function CartIcon({ count = 0, cartData }) {
  // We removed isAuthenticated requirement so guests see their count
  const hasItems = count > 0 || cartData?.items?.length > 0;

  return (
    <div className="relative w-8 h-8">
      {/* Shopping Bag Icon */}
      <ShoppingBag size={16} color="white" className="w-full h-full" />

      {/* Count Badge - Visible for both Guests and Logged-in Users */}
      {hasItems && (
        <div
          className="
            absolute -right-1 -bottom-1
            bg-[#F39200] text-white
            rounded-full
            w-5 h-5
            flex items-center justify-center
            text-xs font-bold
            shadow-sm
            animate-in zoom-in duration-200
          "
        >
          {count}
        </div>
      )}
    </div>
  );
}