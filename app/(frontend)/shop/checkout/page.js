"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  createShippingAddress,
  deleteShippingAddress,
  getCheckoutCities,
  getCheckoutDistricts,
  getCheckoutDivisions,
  getCheckoutSummary,
  getShippingAddresses,
  getShippingMethods,
  placeOrder,
  setDefaultShippingAddress,
  updateShippingAddress,
} from "@/services/checkout.service";
import { Loader2, MapPin, Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const asList = (res, key) => {
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.data?.[key])) return res.data[key];
  return [];
};

const emptyAddressForm = {
  fullName: "",
  phone: "",
  email: "",
  divisionId: "",
  districtId: "",
  cityId: "",
  streetAddress: "",
};

export default function ShopCheckoutPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const {
    shopItems, shopSubtotal, shopCouponDiscount, deliveryFee, shopTotal,
    handleDeleteCartItem, updateShopItemQuantity,
    applyShopCoupon, removeShopCoupon, shopSummary,
  } = useCart();

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [form, setForm] = useState(emptyAddressForm);
  const [savingAddress, setSavingAddress] = useState(false);

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState("");
  const [summary, setSummary] = useState(null);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const hasItems = shopItems.length > 0;

  const loadAddresses = useCallback(async () => {
    try {
      const res = await getShippingAddresses();
      const list = asList(res, "shippingAddresses");
      setAddresses(list);
      setSelectedAddressId((current) => {
        if (current && list.some((item) => item.id === Number(current))) return current;
        const fallback = list.find((item) => item.isDefault) || list[0];
        return fallback ? String(fallback.id) : "";
      });
    } catch (err) {
      console.error("Failed to load addresses:", err);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    Promise.all([
      loadAddresses(),
      getShippingMethods()
        .then((res) => {
          const list = asList(res, "shippingMethods");
          setShippingMethods(list);
          setSelectedShippingMethodId((current) =>
            current || (list[0] ? String(list[0].id) : ""),
          );
        })
        .catch((err) => console.error("Failed to load shipping methods:", err)),
      getCheckoutDivisions()
        .then((res) => setDivisions(asList(res, "divisions")))
        .catch((err) => console.error("Failed to load divisions:", err)),
    ]).catch(() => {});
  }, [isAuthenticated, loadAddresses]);

  useEffect(() => {
    if (!form.divisionId) {
      setDistricts([]);
      setCities([]);
      return;
    }
    let active = true;
    getCheckoutDistricts(form.divisionId)
      .then((res) => active && setDistricts(asList(res, "districts")))
      .catch((err) => console.error("Failed to load districts:", err));
    return () => { active = false; };
  }, [form.divisionId]);

  useEffect(() => {
    if (!form.districtId) {
      setCities([]);
      return;
    }
    let active = true;
    getCheckoutCities(form.districtId)
      .then((res) => active && setCities(asList(res, "cities")))
      .catch((err) => console.error("Failed to load cities:", err));
    return () => { active = false; };
  }, [form.districtId]);

  useEffect(() => {
    setSummary(null);
    if (!selectedAddressId || !selectedShippingMethodId) return;
    let active = true;
    getCheckoutSummary(Number(selectedAddressId), Number(selectedShippingMethodId))
      .then((res) => active && setSummary(res?.data || null))
      .catch((err) => console.error("Failed to load checkout summary:", err));
    return () => { active = false; };
  }, [selectedAddressId, selectedShippingMethodId]);

  const resetAddressForm = () => {
    setForm(emptyAddressForm);
    setEditingAddressId(null);
    setShowAddressForm(false);
  };

  const openEditAddress = (address) => {
    setEditingAddressId(address.id);
    setForm({
      fullName: address.fullName || "",
      phone: address.phone || "",
      email: address.email || "",
      divisionId: address.division?.id ? String(address.division.id) : "",
      districtId: address.district?.id ? String(address.district.id) : "",
      cityId: address.city?.id ? String(address.city.id) : "",
      streetAddress: address.streetAddress || "",
    });
    setShowAddressForm(true);
  };

  const buildAddressPayload = () => ({
    fullName: form.fullName.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    divisionId: Number(form.divisionId),
    districtId: Number(form.districtId),
    cityId: Number(form.cityId),
    streetAddress: form.streetAddress.trim(),
  });

  const handleSaveAddress = async () => {
    const required = ["fullName", "phone", "email", "divisionId", "districtId", "cityId", "streetAddress"];
    if (required.some((field) => !String(form[field]).trim())) {
      return toast.error("Please fill in all address fields");
    }
    try {
      setSavingAddress(true);
      const payload = buildAddressPayload();
      const res = editingAddressId
        ? await updateShippingAddress(editingAddressId, payload)
        : await createShippingAddress(payload);
      await loadAddresses();
      const savedId = res?.data?.id || editingAddressId;
      if (savedId) setSelectedAddressId(String(savedId));
      toast.success(editingAddressId ? "Address updated" : "Address added");
      resetAddressForm();
    } catch (err) {
      const message = err?.response?.data?.message;
      toast.error(Array.isArray(message) ? message.join(", ") : message || "Failed to save address");
    } finally {
      setSavingAddress(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Delete this shipping address?")) return;
    try {
      await deleteShippingAddress(id);
      toast.success("Address deleted");
      await loadAddresses();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete address");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefaultShippingAddress(id);
      toast.success("Default address updated");
      await loadAddresses();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to set default address");
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return toast.error("Enter a coupon code");
    setCouponLoading(true);
    const code = couponCode.trim();
    try { await applyShopCoupon(code); toast.success("Coupon applied!"); setCouponCode(""); }
    catch (err) { toast.error(err?.response?.data?.message || "Invalid coupon"); }
    finally { setCouponLoading(false); }
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) { localStorage.setItem("postLoginRedirect", "/shop/checkout"); return router.push("/accounts/login?redirectTo=%2Fshop%2Fcheckout"); }
    if (!hasItems) return toast.error("Your cart is empty");
    if (!selectedAddressId) return toast.error("Please select a shipping address");
    if (!selectedShippingMethodId) return toast.error("Please select a shipping method");
    if (!agree) return toast.error("Please agree to the terms and conditions");

    try {
      setLoading(true);
      const response = await placeOrder({
        addressId: Number(selectedAddressId),
        shippingMethodId: Number(selectedShippingMethodId),
      });
      const orderData = response?.data;
      if (orderData?.orderNumber) {
        sessionStorage.setItem(
          "lastShopOrder",
          JSON.stringify({
            orderNumber: orderData.orderNumber,
            transactionId: orderData.transactionId,
            amount: orderData.amount,
          }),
        );
      }
      const paymentUrl = orderData?.paymentUrl;
      if (paymentUrl) {
        toast.success("Redirecting to payment gateway...");
        window.location.replace(paymentUrl);
        return;
      }
      toast.success("Order placed successfully!");
      router.push("/shop/checkout/success");
    } catch (err) {
      const message = err?.response?.data?.message;
      toast.error(Array.isArray(message) ? message.join(", ") : message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const summaryTotals = summary?.summary || null;
  const rawProductPrice = Number(summaryTotals?.productPrice ?? shopSubtotal) || 0;
  const productDiscount = Number(summaryTotals?.productDiscountPrice || 0) || 0;
  const effectiveSubtotal = Math.max(0, rawProductPrice - productDiscount) || shopSubtotal;
  const couponDiscountValue = Number(summaryTotals?.couponDiscount ?? shopCouponDiscount) || 0;
  const deliveryFeeValue = Number(summaryTotals?.deliveryFee ?? summaryTotals?.shippingCharge ?? deliveryFee) || 0;
  const shippingDiscount = Number(summaryTotals?.shippingDiscount || 0) || 0;
  const displayTotal =
    Number(
      summaryTotals?.totalPrice ??
        Math.max(0, effectiveSubtotal - couponDiscountValue + deliveryFeeValue - shippingDiscount),
    ) || 0;
  const totals = {
    productPrice: effectiveSubtotal,
    originalProductPrice: rawProductPrice,
    productDiscountPrice: productDiscount,
    couponDiscount: couponDiscountValue,
    deliveryFee: deliveryFeeValue,
    shippingDiscount,
    totalPrice: displayTotal,
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a19a]/30 focus:border-[#00a19a]";

  return (
    <>
      <InnerBanner
        title="Shop Checkout"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }, { label: "Checkout" }]}
      />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          {/* LEFT */}
          <div className="flex-1 space-y-6">
            {!hasItems ? (
              <div className="bg-white p-12 rounded-2xl border text-center">
                <ShoppingBag className="text-gray-300 mx-auto mb-4" size={48} />
                <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
                <button onClick={() => router.push("/shop")} className="mt-4 text-[#00a19a] font-semibold hover:underline">Browse Shop</button>
              </div>
            ) : (
              <>
                {/* Shipping Address */}
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#001819]">Shipping Address</h2>
                    <button
                      type="button"
                      onClick={() => { resetAddressForm(); setShowAddressForm(true); }}
                      className="text-sm font-bold text-[#00a19a] hover:underline"
                    >
                      + Add New
                    </button>
                  </div>

                  {addresses.length > 0 ? (
                    <div className="space-y-3">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className={`flex items-start gap-3 rounded-xl border p-4 transition-colors ${
                            selectedAddressId === String(address.id)
                              ? "border-[#00a19a] bg-[#00a19a]/5"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name="shippingAddress"
                            checked={selectedAddressId === String(address.id)}
                            onChange={() => setSelectedAddressId(String(address.id))}
                            className="mt-1 h-4 w-4 accent-[#00a19a]"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-[#001819]">{address.fullName}</span>
                              {address.isDefault && (
                                <span className="rounded-full bg-[#00a19a]/10 px-2 py-0.5 text-[11px] font-bold text-[#00a19a]">Default</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{address.phone} · {address.email}</p>
                            <p className="text-sm text-gray-600">
                              {[
                                address.streetAddress,
                                address.city?.name,
                                address.district?.name,
                                address.division?.name,
                              ].filter(Boolean).join(", ")}
                            </p>
                            <div className="mt-2 flex gap-4 text-xs font-bold">
                              <button type="button" onClick={() => openEditAddress(address)} className="text-[#00a19a] hover:underline">Edit</button>
                              {!address.isDefault && (
                                <button type="button" onClick={() => handleSetDefault(address.id)} className="text-gray-500 hover:underline">Set as default</button>
                              )}
                              <button type="button" onClick={() => handleDeleteAddress(address.id)} className="text-red-500 hover:underline">Delete</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                      No saved addresses. Add one to continue.
                    </p>
                  )}

                  {showAddressForm && (
                    <div className="mt-4 space-y-4 border-t pt-4">
                      <h3 className="font-bold text-[#001819]">
                        {editingAddressId ? "Edit Address" : "New Address"}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name *</label>
                          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Samrat Biswas" className={inputClass} />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">Phone *</label>
                          <input name="phone" value={form.phone} onChange={handleChange} placeholder="01700000000" className={inputClass} />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label>
                          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">Division *</label>
                          <select
                            name="divisionId"
                            value={form.divisionId}
                            onChange={(e) => setForm((p) => ({ ...p, divisionId: e.target.value, districtId: "", cityId: "" }))}
                            className={inputClass}
                          >
                            <option value="">Select division</option>
                            {divisions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">District *</label>
                          <select
                            name="districtId"
                            value={form.districtId}
                            disabled={!form.divisionId}
                            onChange={(e) => setForm((p) => ({ ...p, districtId: e.target.value, cityId: "" }))}
                            className={`${inputClass} disabled:bg-gray-100 disabled:text-gray-400`}
                          >
                            <option value="">Select district</option>
                            {districts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">City *</label>
                          <select
                            name="cityId"
                            value={form.cityId}
                            disabled={!form.districtId}
                            onChange={(e) => setForm((p) => ({ ...p, cityId: e.target.value }))}
                            className={`${inputClass} disabled:bg-gray-100 disabled:text-gray-400`}
                          >
                            <option value="">Select city</option>
                            {cities.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-sm font-medium text-gray-700 mb-1 block">Street Address *</label>
                          <input name="streetAddress" value={form.streetAddress} onChange={handleChange} placeholder="House 10, Road 5, Dhaka" className={inputClass} />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handleSaveAddress}
                          disabled={savingAddress}
                          className="rounded-lg bg-[#00a19a] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#008c86] disabled:opacity-50 flex items-center gap-2"
                        >
                          {savingAddress && <Loader2 className="h-4 w-4 animate-spin" />}
                          {editingAddressId ? "Update Address" : "Save Address"}
                        </button>
                        <button type="button" onClick={resetAddressForm} className="rounded-lg border px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Shipping Method */}
                {shippingMethods.length > 0 && (
                  <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-[#001819] mb-4">Shipping Method</h2>
                    <div className="space-y-3">
                      {shippingMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
                            selectedShippingMethodId === String(method.id)
                              ? "border-[#00a19a] bg-[#00a19a]/5"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={selectedShippingMethodId === String(method.id)}
                            onChange={() => setSelectedShippingMethodId(String(method.id))}
                            className="h-4 w-4 accent-[#00a19a]"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-[#001819]">{method.name}</p>
                            <p className="text-xs text-gray-500">
                              {method.description}
                              {method.estimatedDeliveryDays ? ` · ${method.estimatedDeliveryDays} days delivery` : ""}
                            </p>
                          </div>
                          <span className="font-bold text-[#001819]">৳ {method.shippingTotal ?? method.shippingCharge}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Order Items */}
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-[#001819] mb-4">Order Items ({shopItems.length})</h2>
                  <div className="space-y-4">
                    {shopItems.map((item) => {
                      const qty = item.quantity || 1;
                      const unit = Number(
                        item.effectiveUnitPrice ?? item.unitSalePrice ?? item.unitPrice ?? 0,
                      );
                      const base = Number(item.baseUnitPrice ?? item.unitPrice ?? unit);
                      const line = Number(item.lineTotal ?? unit * qty);
                      const hasItemDiscount = base > unit && unit > 0;
                      return (
                        <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                          {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="h-16 w-16 rounded-lg object-cover border" />}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-[#001819] text-sm truncate">{item.name}</h3>
                            {item.variantName && <p className="text-xs text-gray-500">{item.variantName}</p>}
                            <p className="text-xs text-gray-500">
                              ৳ {unit.toLocaleString()} each
                              {hasItemDiscount && (
                                <span className="ml-1.5 text-gray-400 line-through">৳ {base.toLocaleString()}</span>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => qty > 1 && updateShopItemQuantity(item.id, qty - 1)} disabled={qty <= 1}
                              className="h-7 w-7 rounded-full border flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40"><Minus size={14} /></button>
                            <span className="font-bold text-sm min-w-[20px] text-center">{qty}</span>
                            <button onClick={() => updateShopItemQuantity(item.id, qty + 1)}
                              className="h-7 w-7 rounded-full border flex items-center justify-center text-gray-500 hover:bg-gray-100"><Plus size={14} /></button>
                          </div>
                          <p className="font-bold text-sm text-[#001819] shrink-0">৳ {line.toLocaleString()}</p>
                          <button onClick={() => handleDeleteCartItem(item.id, "product")} className="text-red-400 hover:text-red-600 shrink-0"><Trash2 size={16} /></button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* RIGHT */}
          <div className="lg:w-[380px] shrink-0">
            <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-md space-y-5">
              <h2 className="text-xl font-bold text-[#001819] border-b pb-3">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({shopItems.length} items)</span>
                  <span className="font-medium">৳ {Number(totals.productPrice || 0).toLocaleString()}</span>
                </div>
                {Number(totals.couponDiscount) > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon discount</span>
                    <span className="font-medium">- ৳ {Number(totals.couponDiscount).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-medium">{Number(totals.deliveryFee) > 0 ? `৳ ${Number(totals.deliveryFee).toLocaleString()}` : "Free"}</span>
                </div>
                {Number(totals.shippingDiscount) > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Shipping discount</span>
                    <span className="font-medium">- ৳ {Number(totals.shippingDiscount).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-[#00a19a] text-xl pt-3 border-t">
                  <span>Total</span>
                  <span>৳ {displayTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Shop Coupon */}
              <div className="border-t pt-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Shop Coupon</p>
                {shopSummary?.coupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <span className="text-sm font-semibold text-green-700 flex items-center gap-1.5"><Tag size={14} /> Applied</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-green-700">- ৳{Number(totals.couponDiscount || shopCouponDiscount).toLocaleString()}</span>
                      <button onClick={removeShopCoupon} className="text-xs text-red-500 hover:text-red-600 font-bold">Remove</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (couponCode.trim() && !couponLoading) handleApplyCoupon();
                        }
                      }}
                      placeholder="Enter coupon code"
                      autoComplete="off"
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a19a]/30"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !couponCode.trim()}
                      className="rounded-lg bg-[#001819] px-4 py-2.5 text-sm font-bold text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
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
                {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</> : `Place Order — ৳ ${displayTotal.toLocaleString()}`}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                <MapPin className="h-3.5 w-3.5" /> Secure checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
