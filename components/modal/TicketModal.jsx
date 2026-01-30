"use client";

import FillButton from "@/components/common/FillButton";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"; // ShadCN Dialog
import { useState } from "react";

export default function TicketModal({ isOpen, onOpenChange, onAddToCart }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    bloodGroup: "",
    gender: "",
    dob: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic required validation
    if (!formData.name || !formData.phone || !formData.age || !formData.gender || !formData.dob) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    if (onAddToCart) onAddToCart(formData);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false); // close modal after submission
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Purchase Ticket</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email (optional)"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Age *</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>

          {/* Blood Group */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              placeholder="Enter your blood group (optional)"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <button
                type="button"
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>
            </DialogClose>

            <FillButton
              type="submit"
              loading={loading}
              bgColor="#00a19a"
              hoverBg="#007d6e"
              textColor="#fff"
              hoverText="#fff"
            >
              Add to Cart
            </FillButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
