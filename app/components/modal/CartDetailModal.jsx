"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash2, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Dynamically retrieves the value for any field name.
 * @param {Array|Object} participantData - The data from API or LocalStorage.
 * @param {string} fieldName - The 'name' attribute of the dynamic field.
 */
const getDynamicValue = (participantData, fieldName) => {
  if (!participantData) return null;
  
  // Handle API format: [{ name: "field_name", value: "value" }]
  if (Array.isArray(participantData)) {
    const field = participantData.find((f) => f.name === fieldName);
    return field ? field.value : null;
  }
  
  // Handle Guest format: { field_name: "value" }
  return participantData[fieldName] || null;
};

export default function CartDetailModal({ open, onClose, cartData }) {
  const router = useRouter();
  const { handleDeleteCartItem } = useCart();
  const { isAuthenticated } = useAuthContext();

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

  

  

  console.log("CartDetailModal received cartData:", cartData); // Debug log to check cartData structure

  const handleCheckout = () => {
    onClose();
    router.push(isAuthenticated ? "/events/checkout" : "/accounts/login?redirectTo=/events/checkout");
  };

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

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 space-y-6">
          {!hasItems ? (
            <div className="text-center py-20">
              <ShoppingCart className="text-gray-300 mx-auto mb-4" size={48} />
              <p className="text-gray-500 font-medium">Your cart is empty</p>
            </div>
          ) : (
            cartData?.items?.map((item, index) => {
              console.log("Rendering cart item:", item); // Debug log to check item structure
              // Extract participant data safely
              const pData = item.formData;
            

              return (
                <div key={item.id || index} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  {/* Item Header */}
                  <div className="bg-gray-50/50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-[#001819]">{item.package?.name || item.eventTicket?.name}</h3>
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

                  {/* Dynamic Participant Data Grid */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3 text-gray-400">
                      <User size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Participant Information</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {/* 
                        If your API/LocalStorage saves the keys, we map them here.
                        Since it's dynamic, we check for common keys or iterate through all.
                      */}
                      {Array.isArray(pData) ? (
                        // API FORMAT: Render all dynamic fields returned by server
                        pData.map((field, fIdx) => {
                          console.log("Rendering field:", field.name, "with value:", field.value);
                          return (
                             <DataField 
                            key={fIdx} 
                            label={field.name.replace(/_/g, ' ')} 
                            value={field.value} 
                          />
                          )
                        })
                      ) : (
                        // GUEST FORMAT: Render all keys in the object
                        Object.entries(pData || {}).map(([key, val], fIdx) => {
                          if (key === 'tempId' || key === 'pak') return null;
                          return (
                            <DataField 
                              key={fIdx} 
                              label={key.replace(/_/g, ' ')} 
                              value={val} 
                            />
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="px-4 py-3 bg-white border-t border-gray-50 flex justify-end">
                    <button
                      onClick={() => handleDeleteCartItem(item.id)}
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 text-xs font-bold uppercase transition-colors"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sticky Footer */}
        <div className="border-t border-gray-200 bg-white px-5 py-4 sm:px-6 shrink-0 sm:rounded-b-xl">
          {hasItems && (
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Payable</span>
              <span className="text-2xl sm:text-3xl font-black text-[#00a19a]">
                ৳ {Math.round(cartData.totalAmount || 0).toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            <button onClick={onClose} className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">
              Continue Shopping
            </button>
            <button
              onClick={handleCheckout}
              disabled={!hasItems}
              className="w-full sm:w-auto rounded-xl bg-[#00a19a] px-10 py-4 text-sm font-bold text-white shadow-lg shadow-teal-500/20 active:scale-95 transition-all disabled:bg-gray-200 disabled:shadow-none"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable component for displaying a label-value pair.
 */
function DataField({ label, value }) {
  // 1. Safety check: If value is null, undefined, or empty object, don't render
  if (!value || (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)) return null;

  // 2. Handle Checkbox/Multiple select arrays
  if (Array.isArray(value)) {
    return (
      <div className="flex flex-col min-w-0">
        <span className="text-[9px] uppercase tracking-tighter text-gray-400 font-extrabold truncate">
          {label}
        </span>
        <span className="font-semibold text-[#001819] text-sm break-all">
          {value.join(", ")}
        </span>
      </div>
    );
  }

  // 3. IMPROVED IMAGE DETECTION:
  // Check for Base64 (guest cart) OR standard HTTP URLs (server cart)
  const isImage = typeof value === "string" && (
    value.startsWith("data:image") || 
    (value.startsWith("http") && (value.match(/\.(jpeg|jpg|gif|png|webp)$/i) || value.includes("/media/")))
  );

  return (
    <div className="flex flex-col min-w-0">
      <span className="text-[9px] uppercase tracking-tighter text-gray-400 font-extrabold truncate">
        {label}
      </span>
      
      {isImage ? (
        <div className="mt-1 relative h-16 w-16 rounded-lg overflow-hidden border border-gray-200 group bg-gray-50">
          <img 
            src={value} 
            alt={label} 
            className="h-full w-full object-cover cursor-zoom-in hover:scale-110 transition-transform"
            onClick={() => {
              if (value.startsWith("http")) {
                window.open(value, '_blank');
              } else {
                // For Base64, open in a new window with a simpler method
                const newTab = window.open();
                newTab.document.body.innerHTML = `<img src="${value}" style="max-width:100%">`;
              }
            }}
          />
        </div>
      ) : (
        <span className="font-semibold text-[#001819] text-sm break-all">
          {value.toString()}
        </span>
      )}
    </div>
  );
}