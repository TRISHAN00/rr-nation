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
  // Initialize state based on fields
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // Sync state when regFields change or modal opens
  useEffect(() => {
    if (isOpen && regFields.length > 0) {
      const initialState = regFields.reduce((acc, field) => {
        // Handle different default values based on type
        if (field.type === "checkbox") acc[field.name] = false;
        else if (field.type === "file") acc[field.name] = null;
        else acc[field.name] = "";
        return acc;
      }, {});
      setFormData(initialState);
    }
  }, [regFields, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // We store the actual file object in state
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };



  // Add this helper function at the top of your file
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Inside handleSubmit...
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare standard FormData for API (Logged in users)
    const data = new FormData();
    data.append("eventTicketId", eventTicketId);
    data.append("quantity", 1);

    // Prepare a special object for Guest Storage
    const guestData = { ...formData, eventTicketId, pak };
    const textFields = [];
    let fileIndex = 1;

    for (const [key, value] of Object.entries(formData)) {
      if (value instanceof File) {
        // 1. For API: Append actual file
        data.append(`files`, value);
        textFields.push({ name: key, value: `file${fileIndex}` });
        fileIndex++;

        // 2. For Guest Storage: Convert to Base64 string
        guestData[key] = await fileToBase64(value);
      } else {
        textFields.push({ name: key, value: value });
      }
    }

    data.append("formData", JSON.stringify(textFields));

    // Now guestData contains Base64 strings instead of File objects
    await onAddToCart(data, guestData);

    setLoading(false);
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
            {regFields
              .slice() // Create a copy before sorting
              .sort((a, b) => a.order - b.order)
              .map((field) => (
                <div
                  key={field.id}
                  className={`flex flex-col ${field.type === "checkbox" ? "md:col-span-2" : "md:col-span-1"
                    }`}
                >
                  <label className="mb-1.5 text-xs sm:text-sm font-bold text-gray-700 capitalize tracking-tight">
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
                      <option value="">{field.placeholder || "Select Option"}</option>
                      {field.options?.map((opt, idx) => (
                        <option key={idx} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) :

                    /* 2. CHECKBOX (Modified for your 'flavors' array style if needed) */
                    field.type === "checkbox" ? (
                      <div className="flex flex-col gap-2">
                        {field.options && field.options.length > 0 ? (
                          field.options.map((opt, idx) => (
                            <label key={idx} className="flex items-center gap-3 h-8 cursor-pointer">
                              <input
                                type="checkbox"
                                name={`${field.name}_${opt.value}`}
                                onChange={(e) => {
                                  const currentValues = formData[field.name] || [];
                                  const newValues = e.target.checked
                                    ? [...currentValues, opt.value]
                                    : currentValues.filter(v => v !== opt.value);
                                  setFormData({ ...formData, [field.name]: newValues });
                                }}
                                className="w-5 h-5 accent-brand"
                              />
                              <span className="text-sm">{opt.label}</span>
                            </label>
                          ))
                        ) : (
                          <div className="flex items-center h-11 gap-3">
                            <input
                              type="checkbox"
                              name={field.name}
                              checked={!!formData[field.name]}
                              onChange={handleChange}
                              className="w-5 h-5 accent-brand"
                              required={field.required}
                            />
                            <span className="text-sm text-gray-600">{field.placeholder}</span>
                          </div>
                        )}
                      </div>
                    ) :

                      /* 3. RADIO BUTTONS - ADDED THIS BLOCK */
                      field.type === "radio" ? (
                        <div className="flex items-center gap-6 h-11">
                          {field.options?.map((opt, idx) => (
                            <label key={idx} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={field.name}
                                value={opt.value}
                                checked={formData[field.name] === opt.value}
                                onChange={handleChange}
                                className="w-4 h-4 accent-brand"
                                required={field.required}
                              />
                              <span className="text-sm text-gray-700">{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      ) :

                        /* 3. FILE UPLOAD */
                        field.type === "file" ? (
                          <input
                            type="file"
                            name={field.name}
                            onChange={handleChange} // This now triggers the logic above
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand/10 file:text-brand hover:file:bg-brand/20 cursor-pointer"
                            required={field.required}
                          />
                        ) :

                          /* 4. DEFAULT INPUTS */
                          (
                            <input
                              type={field.type}
                              name={field.name}
                              value={formData[field.name] || ""}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              className="h-11 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand text-sm border-gray-200"
                              required={field.required}
                            />
                          )}
                </div>
              ))}
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 p-4 sm:p-6 bg-white border-t">
            <DialogClose asChild>
              <button type="button" className="px-6 py-2.5 rounded-xl border font-bold text-sm uppercase">
                Cancel
              </button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="bg-brand text-white px-10 py-2.5 text-sm font-bold rounded-xl"
            >
              {loading ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}