"use client";

import { getProfile, updateProfile } from "@/services/user.service";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function PersonalInformationForm() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  /* -------- FETCH PROFILE DATA -------- */
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await getProfile();
        setUser(res);
      } catch (err) {
        console.error("Failed to load profile");
      } finally {
        setFetching(false);
      }
    }

    fetchProfile();
  }, []);

  /* -------- UPDATE PROFILE -------- */
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const payload = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,

      address: form.address.value,
      birthDate: form.birthDate.value
        ? new Date(form.birthDate.value).toISOString()
        : null,
    };

    try {
      await updateProfile(payload);
      alert("Profile updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return <p className="text-sm text-gray-500">Loading profile...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-3">
        <div>
          <label className="block mb-2 text-sm">First Name</label>
          <input
            name="firstName"
            defaultValue={user?.firstName}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Last Name</label>
          <input
            name="lastName"
            defaultValue={user?.lastName}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block mb-2 text-sm">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            name="email"
            defaultValue={user?.email}
            className="w-full pl-10 border px-3 py-2 rounded-md"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block mb-2 text-sm">Phone</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            name="phone"
            defaultValue={user?.phone}
            className="w-full pl-10 border px-3 py-2 rounded-md"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block mb-2 text-sm">Address</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            name="address"
            defaultValue={user?.address}
            className="w-full pl-10 border px-3 py-2 rounded-md"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm">Birth Date</label>
        <input
          type="date"
          name="birthDate"
          defaultValue={user?.birthDate?.split("T")[0]}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <button
        disabled={loading}
        className="px-6 py-2 bg-black text-white rounded-md"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
