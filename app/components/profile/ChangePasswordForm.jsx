"use client";

import { updatePassword } from "@/services/user.service";
import { Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await updatePassword({
        currentPassword,
        newPassword,
      });

      // ✅ CORRECT RESPONSE HANDLING
      if (res?.statusCode === 200) {
        toast.success(res.data?.message || "Password updated successfully");

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res?.error || "Failed to update password");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.error || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Current Password */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">
          Current Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-black text-sm"
            required
          />
        </div>
      </div>

      {/* New Password */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">
          New Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-black text-sm"
            required
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">
          Confirm New Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-black text-sm"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm font-medium"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
