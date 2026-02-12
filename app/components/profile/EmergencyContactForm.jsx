"use client";

import { updateEmergencyContact } from "@/services/user.service";
import { useState } from "react";

export default function EmergencyContactForm() {
  const [loading, setLoading] = useState(false);
  /* -------- UPDATE PROFILE -------- */
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const payload = {
      name: form.name.value,
      relationship: form.relationship.value,
      emergencyPhone: form.emergencyPhone.value,
    };

    try {
      await updateEmergencyContact(payload);
      toast.success("Updated successfully", {
        position: "top-right",
        className: "bg-green-600 text-white",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} >
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-2">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Contact Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Jane Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Relationship
          </label>
          <input
            type="text"
            name="relationship"
            placeholder="Spouse"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">
          Emergency Phone
        </label>
        <input
          type="tel"
          name="emergencyPhone"
          placeholder="+1 (555) 987-6543"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
        />
      </div>
      <div className="mt-4">
        <button className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 font-medium text-sm">
          Save Emergency Contact
        </button>
      </div>
    </form>
  );
}
