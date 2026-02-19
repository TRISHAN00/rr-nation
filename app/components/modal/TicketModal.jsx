"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";

export default function TicketModal({
  isOpen,
  onOpenChange,
  onAddToCart,
  eventTicketId,
  pak,
}) {
  const tshirtOptions = [
    { label: 'XS (Chest: 36", Length: 25")', value: "XS" },
    { label: 'S (Chest: 38", Length: 26")', value: "S" },
    { label: 'M (Chest: 40", Length: 27")', value: "M" },
    { label: 'L (Chest: 42", Length: 28")', value: "L" },
    { label: 'XL (Chest: 44", Length: 29")', value: "XL" },
    { label: '2XL (Chest: 46", Length: 30")', value: "2XL" },
    { label: '3XL (Chest: 48", Length: 31")', value: "3XL" },
    { label: '3-4 Years (Chest: 26", Length: 18")', value: "3-4 Years" },
    { label: '5-6 Years (Chest: 28", Length: 19")', value: "5-6 Years" },
    { label: '7-8 Years (Chest: 30", Length: 20")', value: "7-8 Years" },
    { label: '9-10 Years (Chest: 32", Length: 22")', value: "9-10 Years" },
    { label: '11-12 Years (Chest: 34", Length: 24")', value: "11-12 Years" },
  ];

  const fields = [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: false },
    { name: "contactNumber", type: "tel", required: true },
    {
      name: "ageCategory",
      type: "select",
      options: ["General", "Veteran (50+)"],
      required: true,
    },
    {
      name: "tshirtSize",
      type: "select",
      required: true,
      options: tshirtOptions,
    },
    {
      name: "gender",
      type: "select",
      options: ["Male", "Female", "Other"],
      required: true,
    },
    { name: "dateOfBirth", type: "date", required: true },
    { name: "bloodGroup", type: "text", required: false },
    { name: "emergencyContactName", type: "text", required: false },
    { name: "emergencyContactNumber", type: "tel", required: false },
    { name: "communityName", type: "text", required: false },
    {
      name: "runnerCategory",
      type: "select",
      options: ["Amateur", "Elite"],
      required: true,
    },
  ];

  const initialState = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: "" }),
    {},
  );

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyField = fields.find((f) => f.required && !formData[f.name]);
    if (emptyField) {
      alert(`Please fill the required field: ${emptyField.name}`);
      return;
    }

    setLoading(true);
    const payload = {
      eventTicketId,
      quantity: 1,
      participant: {
        ...formData,
        distanceCategory: pak?.distance,
      },
    };

    if (onAddToCart) {
      onAddToCart(payload).then(() => {
        setLoading(false);
        onOpenChange(false);
        setFormData(initialState);
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* max-h-[90dvh] handles the dynamic height on mobile browsers */}
      <DialogContent className="max-w-3xl w-[95%] sm:w-full max-h-[90dvh] flex flex-col p-0 overflow-hidden gap-0">
        
        {/* Fixed Header */}
        <DialogHeader className="shrink-0 border-b p-5 bg-white z-10">
          <DialogTitle className="text-lg sm:text-xl font-bold text-[#001819]">
            {pak?.name}
          </DialogTitle>
          <p className="text-sm text-brand font-semibold">
            Distance: {pak?.distance}
          </p>
        </DialogHeader>

        {/* Scrollable Form Area */}
        <form
          className="flex-1 overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-5 sm:p-6 pb-24 md:pb-6">
            {fields.map((field) => {
              const label = field.name
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase());

              return (
                <div key={field.name} className="flex flex-col">
                  <label className="mb-1.5 text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-tight">
                    {label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>

                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="h-11 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand bg-white text-sm appearance-none border-gray-200"
                      required={field.required}
                    >
                      <option value="">Select {label}</option>
                      {field.options.map((option) => {
                        const isObj = typeof option === "object";
                        const val = isObj ? option.value : option;
                        const text = isObj ? option.label : option;
                        return (
                          <option key={val} value={val}>
                            {text}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="h-11 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand text-sm border-gray-200 placeholder:text-gray-400"
                      required={field.required}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Sticky Footer for Form Actions */}
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
    </Dialog>
  );
}