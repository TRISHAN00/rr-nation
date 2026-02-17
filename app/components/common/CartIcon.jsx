import { ShoppingBag } from "lucide-react";

export default function CartIcon({ count = 0 }) {
  return (
    <div className="relative cursor-pointer w-8 h-8">
      {/* Shopping Bag Icon */}
      <ShoppingBag size={16} color="white" className="w-full h-full" />

      {/* Count Badge */}
      {count > 0 && (
        <div
          className="
        absolute -right-1 -bottom-1
        bg-[#F39200] text-white
        rounded-full
        w-5 h-5
        flex items-center justify-center
        text-xs font-bold
      "
        >
          {count}
        </div>
      )}
    </div>
  );
}
