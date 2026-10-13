"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Loader2, Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ShopCheckoutPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const {
    shopItems, shopSubtotal, shopCouponDiscount, deliveryFee,
    handleDeleteCartItem, updateShopItemQuantity,
    applyShopCoupon, removeShopCoupon, shopSummary,
  } = useCart();

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", address: "", division: "", district: "", city: "", note: "" });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const hasItems = shopItems.length > 0;
  const total = shopSubtotal - shopCouponDiscount + deliveryFee;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return toast.error("Enter a coupon code");
    setCouponLoading(true);
    try { await applyShopCoupon(couponCode.trim()); toast.success("Coupon applied!"); setCouponCode(""); }
    catch (err) { toast.error(err?.response?.data?.message || "Invalid coupon"); }
    finally { setCouponLoading(false); }
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) { localStorage.setItem("postLoginRedirect", "/shop/checkout"); return router.push("/accounts/login?redirectTo=%2Fshop%2Fcheckout"); }
    if (!form.fullName || !form.phone || !form.address) return toast.error("Please fill in all required fields");
    if (!agree) return toast.error("Please agree to the terms and conditions");
    if (!hasItems) return toast.error("Your cart is empty");
    try {
      setLoading(true);
      // TODO: Replace with actual shop checkout API
      toast.success("Order placed successfully!");
      router.push("/shop/checkout/success");
    } catch (err) { toast.error(err?.response?.data?.message || "Failed to place order"); }
    finally { setLoading(false); }
  };

  return (
    <>
      <InnerBanner
        title="Shop Checkout"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }, { label: "Checkout" }]}
      />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          {/* LEFT: Shipping + Items */}
          <div className="flex-1 space-y-6">
            {!hasItems ? (
              <div className="bg-white p-12 rounded-2xl border text-center">
                <ShoppingBag className="text-gray-300 mx-auto mb-4 text-gray-300" size={48} />
                <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
                <button onClick={() => router.push("/shop")} className="mt-4 text-[#00a19a] font-semibold hover:underline">Browse Shop</button>
              </div>
            ) : (
              <>
                {/* Shipping Form */}
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-[#001819] mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "fullName", label: "Full Name *", placeholder: "Enter your full name", span: false },
                      { name: "phone", label: "Phone *", placeholder: "+880 1XXX XXX XXX", span: false },
                      { name: "address", label: "Address *", placeholder: "House #, Road #, Area", span: true },
                      { name: "division", label: "Division", placeholder: "e.g. Dhaka", span: false },
                      { name: "district", label: "District", placeholder: "e.g. Dhaka", span: false },
                      { name: "city", label: "City", placeholder: "e.g. Mirpur", span: false },
                      { name: "note", label: "Order Note", placeholder: "Optional", span: false },
                    ].map((f) => (
                      <div key={f.name} className={f.span ? "sm:col-span-2" : ""}>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">{f.label}</label>
                        <input
                          name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a19a]/30 focus:border-[#00a19a]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-[#001819] mb-4">Order Items ({shopItems.length})</h2>
                  <div className="space-y-4">
                    {shopItems.map((item) => {
                      const price = Number(item.unitSalePrice || item.unitPrice || 0);
                      const qty = item.quantity || 1;
                      return (
                        <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                          {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="h-16 w-16 rounded-lg object-cover border" />}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-[#001819] text-sm truncate">{item.name}</h3>
                            {item.variantName && <p className="text-xs text-gray-500">{item.variantName}</p>}
                            <p className="text-xs text-gray-500">৳ {price.toLocaleString()} each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => qty > 1 && updateShopItemQuantity(item.id, qty - 1)} disabled={qty <= 1}
                              className="h-7 w-7 rounded-full border flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40"><Minus size={14} /></button>
                            <span className="font-bold text-sm min-w-[20px] text-center">{qty}</span>
                            <button onClick={() => updateShopItemQuantity(item.id, qty + 1)}
                              className="h-7 w-7 rounded-full border flex items-center justify-center text-gray-500 hover:bg-gray-100"><Plus size={14} /></button>
                          </div>
                          <p className="font-bold text-sm text-[#001819] shrink-0">৳ {(price * qty).toLocaleString()}</p>
                          <button onClick={() => handleDeleteCartItem(item.id, "product")} className="text-red-400 hover:text-red-600 shrink-0"><Trash2 size={16} /></button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* RIGHT: Order Summary + Shop Coupon */}
          <div className="lg:w-[380px] shrink-0">
            <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-md space-y-5">
              <h2 className="text-xl font-bold text-[#001819] border-b pb-3">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({shopItems.length} items)</span>
                  <span className="font-medium">৳ {shopSubtotal.toLocaleString()}</span>
                </div>
                {shopCouponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon discount</span>
                    <span className="font-medium">- ৳ {shopCouponDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-medium">{deliveryFee > 0 ? `৳ ${deliveryFee.toLocaleString()}` : "Free"}</span>
                </div>
                <div className="flex justify-between font-bold text-[#00a19a] text-xl pt-3 border-t">
                  <span>Total</span>
                  <span>৳ {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Shop Coupon */}
              <div className="border-t pt-4">
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
                    <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter coupon code"
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a19a]/30" />
                    <button onClick={handleApplyCoupon} disabled={couponLoading}
                      className="rounded-lg bg-[#001819] px-4 py-2.5 text-sm font-bold text-white hover:bg-gray-800 transition-colors disabled:opacity-50">
                      {couponLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
                    </button>
                  </div>
                )}
              </div>

              {/* Terms */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 h-4 w-4 rounded border-gray-300 text-[#00a19a]" />
                  <span className="text-xs text-gray-600 leading-tight">I have read and agree to the website <a href="/privacy-policy" className="text-[#00a19a] font-bold underline">terms and conditions</a>.</span>
                </label>
              </div>

              <button onClick={handlePlaceOrder} disabled={!hasItems || !agree || loading}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center transition-all ${!hasItems || !agree || loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#00a19a] hover:bg-[#008c86] active:scale-[0.98]"}`}>
                {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</> : `Place Order — ৳ ${total.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
