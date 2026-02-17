"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const initialCartData = {
  id: 4,
  totalAmount: "5665.00",
  items: [
    {
      id: 1,
      totalPrice: "1133.00",
      participant: {
        name: "John Doe",
        gender: "Male",
        tshirtSize: "M",
        bloodGroup: "O+",
        contactNumber: "+1234567890",
        district: "Dhaka",
      },
      eventTicket: {
        name: "Boishakhi Fun Run",
        distance: "1.33km",
      },
    },
    {
      id: 2,
      totalPrice: "1133.00",
      participant: {
        name: "Trishan Saha",
        gender: "Male",
        tshirtSize: "L",
        bloodGroup: "B+",
        contactNumber: "+8801712345678",
        district: "Dhaka",
      },
      eventTicket: {
        name: "Boishakhi Fun Run",
        distance: "1.33km",
      },
    },
    {
      id: 3,
      totalPrice: "1133.00",
      participant: {
        name: "Rishan Saha",
        gender: "Male",
        tshirtSize: "S",
        bloodGroup: "A+",
        contactNumber: "+8801812345678",
        district: "Gazipur",
      },
      eventTicket: {
        name: "Boishakhi Fun Run",
        distance: "1.33km",
      },
    },
    {
      id: 4,
      totalPrice: "1133.00",
      participant: {
        name: "Nabila Khan",
        gender: "Female",
        tshirtSize: "M",
        bloodGroup: "O-",
        contactNumber: "+8801912345678",
        district: "Narayanganj",
      },
      eventTicket: {
        name: "Boishakhi Fun Run",
        distance: "1.33km",
      },
    },
    {
      id: 5,
      totalPrice: "1133.00",
      participant: {
        name: "Arif Hossain",
        gender: "Male",
        tshirtSize: "XL",
        bloodGroup: "AB+",
        contactNumber: "+8801612345678",
        district: "Chattogram",
      },
      eventTicket: {
        name: "Boishakhi Fun Run",
        distance: "1.33km",
      },
    },
  ],
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState(initialCartData.items);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [agree, setAgree] = useState(false);

  const handleDelete = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + parseFloat(item.totalPrice),
      0,
    );
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      setDiscount(calculateSubtotal() * 0.1);
      alert("Coupon applied! 10% discount applied.");
    } else {
      setDiscount(0);
      alert("Invalid coupon code.");
    }
  };

  const handleCheckout = () => {
    if (!agree) {
      alert("You must agree to the terms and conditions before payment.");
      return;
    }

    console.log("Checkout Data:", {
      cart: cartItems,
      subtotal: calculateSubtotal(),
      discount,
      total: calculateSubtotal() - discount,
    });
    alert("Checkout submitted! Check console for data.");
  };

  return (
    <>
      <InnerBanner
        title="Checkout"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Checkout" }]}
      />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto flex flex-col lg:flex-row gap-8">
          {/* LEFT: Cart Items */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold text-[#001819] mb-4">
              Your Cart
            </h1>

            {cartItems.length === 0 && (
              <p className="text-gray-500">Your cart is empty.</p>
            )}

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg bg-white p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium text-[#001819]">
                      {item.eventTicket.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Distance: {item.eventTicket.distance}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[#00a19a]">
                      ৳ {item.totalPrice}
                    </p>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1 text-red-500 hover:bg-red-100 rounded"
                      title="Delete item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div>
                    <span className="opacity-60">Name:</span>{" "}
                    {item.participant.name}
                  </div>
                  <div>
                    <span className="opacity-60">Gender:</span>{" "}
                    {item.participant.gender}
                  </div>
                  <div>
                    <span className="opacity-60">T-shirt:</span>{" "}
                    {item.participant.tshirtSize}
                  </div>
                  <div>
                    <span className="opacity-60">Blood:</span>{" "}
                    {item.participant.bloodGroup}
                  </div>
                  <div>
                    <span className="opacity-60">Contact:</span>{" "}
                    {item.participant.contactNumber}
                  </div>
                  <div>
                    <span className="opacity-60">District:</span>{" "}
                    {item.participant.district}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Summary & Coupon (Sticky) */}
          <div className="w-full max-w-md shrink-0">
            <div className="sticky top-20 rounded-lg border bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-semibold text-dark">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>৳ {calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Discount</span>
                <span>৳ {discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-brand text-lg">
                <span>Total</span>
                <span>৳ {(calculateSubtotal() - discount).toFixed(2)}</span>
              </div>

              {/* Coupon Code */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 rounded border border-gray-300 p-2"
                />
                <button
                  onClick={applyCoupon}
                  className="h-full rounded-lg bg-brand p-4 text-white font-medium hover:bg-[#009088]"
                >
                  Apply Coupon
                </button>
              </div>

              {/* Agree Terms */}
              <label className="flex items-center gap-2 text-sm mt-3">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  className="rounded border-gray-300"
                />
                I agree to the{" "}
                <a href="#" className="text-brand underline">
                  terms & conditions
                </a>
              </label>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full mt-4 rounded-lg bg-brand py-3 text-white font-medium hover:bg-[#009088]"
                disabled={cartItems.length === 0 || !agree}
              >
                Confirm & Pay ৳ {(calculateSubtotal() - discount).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
