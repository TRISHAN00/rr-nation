"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Loader2, Minus, Package, Plus, ShoppingCart, Tag, Trash2, Trophy, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CartDetailModal({ open, onClose, cartData }) {
  const router = useRouter();
  const {
    handleDeleteCartItem,
    updateShopItemQuantity,
    eventItems,
    shopItems,
    eventSubtotal,
    shopSubtotal,
    shopCouponDiscount,
    deliveryFee,
    eventDiscount,
    grandTotal,
    applyEventCoupon,
    removeEventCoupon,
    applyShopCoupon,
    removeShopCoupon,
    shopSummary,
  } = useCart();
  const { isAuthenticated } = useAuthContext();

  const [activeTab, setActiveTab] = useState("shop");
  const [eventCouponCode, setEventCouponCode] = useState("");
  const [eventCouponLoading, setEventCouponLoading] = useState(false);
  const [shopCouponCode, setShopCouponCode] = useState("");
  const [shopCouponLoading, setShopCouponLoading] = useState(false);

  // Auto-select tab if only one type exists
  useEffect(() => {
    if (shopItems.length > 0 && eventItems.length === 0) setActiveTab("shop");
    else if (eventItems.length > 0 && shopItems.length === 0) setActiveTab("events");
  }, [shopItems.length, eventItems.length]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  if (!open) return null;

  const hasItems = cartData?.items?.length > 0;
  const hasEvent = eventItems.length > 0;
  const hasShop = shopItems.length > 0;

  const handleCheckout = () => {
    onClose();
    const target = activeTab === "events" ? "/events/checkout" : "/shop/checkout";
    if (isAuthenticated) router.push(target);
    else {
      localStorage.setItem("postLoginRedirect", target);
      router.push(`/accounts/login?redirectTo=${encodeURIComponent(target)}`);
    }
  };

  const handleApplyEventCoupon = async () => {
    if (!eventCouponCode.trim()) return toast.error("Enter a coupon code");
    setEventCouponLoading(true);
    try {
      const result = await applyEventCoupon(eventCouponCode.trim());
      if (result.success) { toast.success(`Coupon applied! Saved ৳${result.amount}`); setEventCouponCode(""); }
      else toast.error("Coupon not recognized");
    } catch (err) { toast.error(err?.response?.data?.message || "Invalid coupon"); }
    finally { setEventCouponLoading(false); }
  };

  const handleApplyShopCoupon = async () => {
    if (!shopCouponCode.trim()) return toast.error("Enter a coupon code");
    setShopCouponLoading(true);
    try { await applyShopCoupon(shopCouponCode.trim()); toast.success("Coupon applied!"); setShopCouponCode(""); }
    catch (err) { toast.error(err?.response?.data?.message || "Invalid coupon"); }
    finally { setShopCouponLoading(false); }
  };

  const activeItems = activeTab === "events" ? eventItems : shopItems;
  const activeSubtotal = activeTab === "events" ? eventSubtotal : shopSubtotal;
  const activeDiscount = activeTab === "events" ? Number(eventDiscount || 0) : shopCouponDiscount;
  const activeDelivery = activeTab === "events" ? 0 : deliveryFee;
  const activeTotal = activeTab === "events"
    ? Math.max(0, eventSubtotal - Number(eventDiscount || 0))
    : shopSubtotal - shopCouponDiscount + deliveryFee;

  return (
    <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full sm:max-w-3xl lg:max-w-4xl rounded-t-2xl sm:rounded-xl bg-[#fafafa] shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">

        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl sm:rounded-t-xl bg-[#00a19a] px-5 py-4 sm:px-6 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-white" size={20} />
            <h2 className="text-base sm:text-lg font-semibold text-white">Review Your Cart</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-white hover:bg-white/20 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        {hasItems && hasEvent && hasShop && (
          <div className="flex shrink-0 bg-white border-b border-gray-200">
            <button
              onClick={() => setActiveTab("shop")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-colors border-b-2 ${
                activeTab === "shop"
                  ? "text-[#00a19a] border-[#00a19a]"
                  : "text-gray-400 border-transparent hover:text-gray-600"
              }`}
            >
              <Package size={16} />
              Shop Products ({shopItems.length})
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-colors border-b-2 ${
                activeTab === "events"
                  ? "text-[#00a19a] border-[#00a19a]"
                  : "text-gray-400 border-transparent hover:text-gray-600"
              }`}
            >
              <Trophy size={16} />
              Event Tickets ({eventItems.length})
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 space-y-6">
          {!hasItems ? (
            <div className="text-center py-20">
              <ShoppingCart className="text-gray-300 mx-auto mb-4" size={48} />
              <p className="text-gray-500 font-medium">Your cart is empty</p>
            </div>
          ) : activeTab === "shop" ? (
            /* ═══ SHOP TAB ═══ */
            <>
              <div className="space-y-3">
                {shopItems.map((item) => {
                  const price = Number(item.unitSalePrice || item.unitPrice || 0);
                  const qty = item.quantity || 1;
                  return (
                    <div key={item.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                      <div className="flex items-center gap-4 px-4 py-3">
                        {item.imageUrl && (
                          <img src={item.imageUrl} alt={item.name} className="h-16 w-16 rounded-lg object-cover border border-gray-200" />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[#001819] text-sm truncate">{item.name}</h4>
                          {item.variantName && <p className="text-xs text-gray-500">{item.variantName}</p>}
                          <p className="text-xs text-[#00a19a] font-semibold">৳ {price.toLocaleString()} each</p>
                        </div>
                        <p className="font-bold text-[#001819] shrink-0 text-lg">৳ {(price * qty).toLocaleString()}</p>
                      </div>
                      <div className="px-4 py-2 bg-gray-50/50 border-t flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => qty > 1 && updateShopItemQuantity(item.id, qty - 1)}
                            disabled={qty <= 1}
                            className="h-7 w-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-bold text-sm min-w-[20px] text-center">{qty}</span>
                          <button
                            onClick={() => updateShopItemQuantity(item.id, qty + 1)}
                            className="h-7 w-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteCartItem(item.id, "product")}
                          className="flex items-center gap-1.5 text-red-500 hover:text-red-600 text-xs font-bold uppercase"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Shop Coupon */}
              <div className="bg-white border rounded-xl p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Shop Coupon</p>
                {shopSummary?.coupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <span className="text-sm font-semibold text-green-700 flex items-center gap-1.5"><Tag size={14} /> Applied</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-green-700">- ৳{shopCouponDiscount.toLocaleString()}</span>
                      <button onClick={removeShopCoupon} className="text-xs text-red-500 hover:text-red-600 font-bold">Remove</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      value={shopCouponCode}
                      onChange={(e) => setShopCouponCode(e.target.value)}
                      placeholder="Shop coupon code"
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a19a]/30"
                    />
                    <button
                      onClick={handleApplyShopCoupon}
                      disabled={shopCouponLoading}
                      className="rounded-lg bg-[#001819] px-4 py-2 text-sm font-bold text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {shopCouponLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* ═══ EVENTS TAB ═══ */
            <>
              <div className="space-y-3">
                {eventItems.map((item) => {
                  const pData = item.formData;
                  return (
                    <div key={item.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                      <div className="bg-gray-50/50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-[#001819]">{item.package?.name || item.eventTicket?.name}</h4>
                          <p className="text-xs text-[#00a19a] font-semibold">
                            Distance: {item.package?.distance || item.eventTicket?.distance}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-[#001819]">
                            ৳ {(Number(item.unitPrice) || Number(item.package?.price) || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="px-4 py-3">
                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                          <User size={12} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Participant</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {Array.isArray(pData)
                            ? pData.map((f, i) => <DataField key={i} label={f.name.replace(/_/g, " ")} value={f.value} />)
                            : Object.entries(pData || {}).map(([k, v], i) => {
                                if (k === "tempId" || k === "pak") return null;
                                return <DataField key={i} label={k.replace(/_/g, " ")} value={v} />;
                              })}
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-white border-t border-gray-50 flex justify-end">
                        <button
                          onClick={() => handleDeleteCartItem(item.id)}
                          className="flex items-center gap-1.5 text-red-500 hover:text-red-600 text-xs font-bold uppercase"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Event Coupon */}
              <div className="bg-white border rounded-xl p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Event Coupon</p>
                {eventDiscount > 0 ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <span className="text-sm font-semibold text-green-700 flex items-center gap-1.5"><Tag size={14} /> Applied</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-green-700">- ৳{Number(eventDiscount).toLocaleString()}</span>
                      <button onClick={removeEventCoupon} className="text-xs text-red-500 hover:text-red-600 font-bold">Remove</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      value={eventCouponCode}
                      onChange={(e) => setEventCouponCode(e.target.value)}
                      placeholder="Event coupon code"
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a19a]/30"
                    />
                    <button
                      onClick={handleApplyEventCoupon}
                      disabled={eventCouponLoading}
                      className="rounded-lg bg-[#001819] px-4 py-2 text-sm font-bold text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {eventCouponLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer: Active tab summary */}
        <div className="border-t border-gray-200 bg-white px-5 py-4 sm:px-6 shrink-0 sm:rounded-b-xl">
          {hasItems && activeItems.length > 0 && (
            <div className="space-y-1.5 mb-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({activeItems.length} items)</span>
                <span className="font-medium">৳ {activeSubtotal.toLocaleString()}</span>
              </div>
              {activeDiscount > 0 && (
                <div className="flex justify-between text-green-600 text-xs">
                  <span>Coupon discount</span>
                  <span className="font-medium">- ৳ {activeDiscount.toLocaleString()}</span>
                </div>
              )}
              {activeDelivery > 0 && (
                <div className="flex justify-between text-gray-600 text-xs">
                  <span>Delivery fee</span>
                  <span className="font-medium">৳ {activeDelivery.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-[#00a19a] text-xl pt-2 border-t">
                <span>Total</span>
                <span>৳ {Math.round(activeTotal).toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            <button onClick={onClose} className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">
              Continue Shopping
            </button>
            <button
              onClick={handleCheckout}
              disabled={activeItems.length === 0}
              className="w-full sm:w-auto rounded-xl bg-[#00a19a] px-10 py-4 text-sm font-bold text-white shadow-lg shadow-teal-500/20 active:scale-95 transition-all disabled:bg-gray-200 disabled:shadow-none"
            >
              {activeTab === "events" ? "Event Checkout" : "Shop Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataField({ label, value }) {
  if (!value || (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0)) return null;

  if (Array.isArray(value)) {
    return (
      <div className="flex flex-col min-w-0">
        <span className="text-[9px] uppercase tracking-tighter text-gray-400 font-extrabold truncate">{label}</span>
        <span className="font-semibold text-[#001819] text-sm break-all">{value.join(", ")}</span>
      </div>
    );
  }

  const isImage = typeof value === "string" && (
    value.startsWith("data:image") ||
    (value.startsWith("http") && (value.match(/\.(jpeg|jpg|gif|png|webp)$/i) || value.includes("/media/")))
  );

  return (
    <div className="flex flex-col min-w-0">
      <span className="text-[9px] uppercase tracking-tighter text-gray-400 font-extrabold truncate">{label}</span>
      {isImage ? (
        <div className="mt-1 relative h-14 w-14 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <img src={value} alt={label} className="h-full w-full object-cover" onClick={() => window.open(value, "_blank")} />
        </div>
      ) : (
        <span className="font-semibold text-[#001819] text-sm break-all">{value.toString()}</span>
      )}
    </div>
  );
}
