"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function TicketModal({
  isOpen,
  onOpenChange,
  onAddToCart,
  eventTicketId,
  pak,
  regFields = [],
}) {

  console.log("Received regFields in TicketModal:", regFields); // Debug log to check the regFields structure

  const [formData, setFormData] = useState(
    regFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (regFields.length > 0) {
      const initialState = regFields.reduce((acc, field) => {
        // Map the field "name" (from JSON) to the state key
        acc[field.name] = "";
        return acc;
      }, {});
      setFormData(initialState);
    }
  }, [regFields]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Inside TicketModal.js - Update the handleSubmit function

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Format for API
    const formattedFields = Object.entries(formData).map(([key, value]) => ({
      name: key,
      value: value,
    }));

    // 2. Prepare Multipart Payload
    const data = new FormData();
    data.append("eventTicketId", eventTicketId);
    data.append("quantity", 1);
    data.append("formData", JSON.stringify(formattedFields));

    // This is the object that was "undefined" in your error
    const rawDataForGuest = {
      ...formData,
      tempId: Date.now().toString(),
      pak: pak // Include package info for price/name display
    };

    // Pass BOTH arguments
    await onAddToCart(data, rawDataForGuest);
    onOpenChange(false);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[95%] sm:w-full max-h-[90dvh] flex flex-col p-0 overflow-hidden gap-0">
        <DialogHeader className="shrink-0 border-b p-5 bg-white z-10">
          <DialogTitle className="text-lg sm:text-xl font-bold text-dark">
            {pak?.name}
          </DialogTitle>
          <p className="text-sm text-brand font-semibold">
            Distance: {pak?.distance}
          </p>
        </DialogHeader>

        <form className="flex-1 overflow-y-auto pb-32 md:pb-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-5">
            {/* 3. Map through the dynamic regFields from props */}
            {regFields
              .sort((a, b) => a.order - b.order)
              .map((field) => (
                <div
                  key={field.id || field.name}
                  className={`flex flex-col ${field.type === "checkbox" || field.type === "radio" ? "md:col-span-1" : ""}`}
                >
                  <label className="mb-1.5 text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-tight">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>

                  {/* 1. SELECT DROPDOWN */}
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="h-11 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand bg-white text-sm border-gray-200"
                      required={field.required}
                    >
                      <option value="">{field.placeholder || `Select ${field.label}`}</option>
                      {field.options?.map((option, idx) => (
                        <option key={idx} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  ) :

                    /* 2. CHECKBOX */
                    field.type === "checkbox" ? (
                      <div className="flex items-center h-11 gap-3">
                        <input
                          type="checkbox"
                          name={field.name}
                          checked={!!formData[field.name]}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.checked })}
                          className="w-5 h-5 accent-brand border-gray-300 rounded"
                          required={field.required}
                        />
                        <span className="text-sm text-gray-600">{field.placeholder || "I agree"}</span>
                      </div>
                    ) :

                      /* 3. RADIO BUTTONS */
                      field.type === "radio" ? (
                        <div className="flex flex-wrap gap-4 h-11 items-center">
                          {field.options?.map((option, idx) => (
                            <label key={idx} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={field.name}
                                value={option.value}
                                checked={formData[field.name] === option.value}
                                onChange={handleChange}
                                className="w-4 h-4 accent-brand"
                                required={field.required}
                              />
                              <span className="text-sm text-gray-600">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      ) :

                        /* 4. FILE UPLOAD */
                        field.type === "file" ? (
                          <input
                            type="file"
                            name={field.name}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.files[0] })}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand/10 file:text-brand hover:file:bg-brand/20 cursor-pointer"
                            required={field.required}
                          />
                        ) :

                          /* 5. STANDARD INPUTS (tel, date, text, email, number) */
                          (
                            <input
                              type={field.type} // date, tel, email, number, etc.
                              name={field.name}
                              value={formData[field.name] || ""}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              // Enhances mobile experience for phone/numbers
                              inputMode={field.type === "tel" ? "tel" : field.type === "number" ? "numeric" : "text"}
                              className="h-11 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand text-sm border-gray-200"
                              required={field.required}
                            />
                          )}
                </div>
              ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 md:relative flex flex-col-reverse sm:flex-row justify-end gap-3 p-4 sm:p-6 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] md:shadow-none">
            <DialogClose asChild>
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 font-bold transition-all text-sm uppercase tracking-wide"
              >
                Cancel
              </button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-brand hover:bg-[#008c86] text-white px-10 py-2.5 text-sm font-bold rounded-xl transition-all shadow-md active:scale-[0.98]"
            >
              {loading ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog >
  );
}