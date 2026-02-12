"use client";

import {
  getEmergencyContactData,
  updateEmergencyContact,
} from "@/services/user.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EmergencyContactForm() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
  });

  /* -------- 1. FETCH ON MOUNT -------- */
  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await getEmergencyContactData();
        // CLEANER DATA EXTRACTION: Checks both common Nest/Express patterns
        const contact = res?.data?.data || res?.data;

        if (contact) {
          setFormData({
            name: contact.name || "",
            relationship: contact.relationship || "",
            phone: contact.phone || contact.emergencyPhone || "",
          });
        }
      } catch (err) {
        console.error("Load Error:", err);
      } finally {
        setFetching(false);
      }
    }
    fetchContact();
  }, []);

  /* -------- 2. HANDLE SUBMIT -------- */
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateEmergencyContact(formData);
      
      toast.success("Emergency contact updated successfully");
      
    } catch (err) {
      console.error("Update Error:", err);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) return <p className="text-sm text-gray-500 animate-pulse">Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Contact Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Relationship</label>
          <input
            type="text"
            value={formData.relationship}
            onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Emergency Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 font-medium text-sm disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Emergency Contact"}
      </button>
    </form>
  );
}