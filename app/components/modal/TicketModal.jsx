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
  // 1. Defined T-Shirt options with labels for UI and clean values for Backend
  const tshirtOptions = [
    { label: "XS (Chest: 36\", Length: 25\")", value: "XS" },
    { label: "S (Chest: 38\", Length: 26\")", value: "S" },
    { label: "M (Chest: 40\", Length: 27\")", value: "M" },
    { label: "L (Chest: 42\", Length: 28\")", value: "L" },
    { label: "XL (Chest: 44\", Length: 29\")", value: "XL" },
    { label: "2XL (Chest: 46\", Length: 30\")", value: "2XL" },
    { label: "3XL (Chest: 48\", Length: 31\")", value: "3XL" },
    { label: "3-4 Years (Chest: 26\", Length: 18\")", value: "3-4 Years" },
    { label: "5-6 Years (Chest: 28\", Length: 19\")", value: "5-6 Years" },
    { label: "7-8 Years (Chest: 30\", Length: 20\")", value: "7-8 Years" },
    { label: "9-10 Years (Chest: 32\", Length: 22\")", value: "9-10 Years" },
    { label: "11-12 Years (Chest: 34\", Length: 24\")", value: "11-12 Years" },
  ];

  // 2. Exact fields requested
  const fields = [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: false },
    { name: "contactNumber", type: "tel", required: true },
    { 
      name: "ageCategory", 
      type: "select", 
      options: ["General", "Veteran (50+)"], 
      required: true 
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
      required: true 
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
    const formattedValue = type === "number" ? (value === "" ? "" : Number(value)) : value;
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyField = fields.find((f) => f.required && !formData[f.name]);
    if (emptyField) {
      alert(`Please fill the required field: ${emptyField.name.replace(/([A-Z])/g, " $1")}`);
      return;
    }

    setLoading(true);

    const payload = {
      eventTicketId,
      quantity: 1,
      participant: { 
        ...formData,
        distanceCategory: pak?.distance // Injected from pak
      },
    };

    if (onAddToCart) {
      onAddToCart(payload);
    }

    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      setFormData(initialState);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0 border-b pb-4">
          <DialogTitle className="text-xl font-bold text-[#001819]">{pak?.name}</DialogTitle>
          <p className="text-sm text-[#00a19a] font-medium">Distance: {pak?.distance}</p>
        </DialogHeader>

        <form 
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4 overflow-y-auto px-1 py-2" 
          onSubmit={handleSubmit}
        >
          {fields.map((field) => {
            const label = field.name
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());

            return (
              <div key={field.name} className="flex flex-col">
                <label className="mb-1 text-sm font-semibold text-gray-700">
                  {label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a19a] bg-white text-sm"
                    required={field.required}
                  >
                    <option value="">Select {label}</option>
                    {field.options.map((option) => {
                      const isObj = typeof option === 'object';
                      const val = isObj ? option.value : option;
                      const text = isObj ? option.label : option;
                      return (
                        <option key={val} value={val}>{text}</option>
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
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a19a] text-sm"
                    required={field.required}
                  />
                )}
              </div>
            );
          })}

          <div className="md:col-span-2 flex justify-end gap-3 mt-6 sticky bottom-0 bg-white py-4 border-t">
            <DialogClose asChild>
              <button type="button" className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium transition-colors text-sm">
                Cancel
              </button>
            </DialogClose>
            <Button type="submit" disabled={loading} className="bg-[#00a19a] hover:bg-[#008c86] text-white px-8 text-sm">
              {loading ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}