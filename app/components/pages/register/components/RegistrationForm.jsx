"use client";

import MemberForm from "@/app/(frontend)/member-register/_components/MemberForm";
import MemPayModal from "@/app/(frontend)/profile/_components/MemPayModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { registerMember } from "@/services/member.service";
import { useState } from "react";
import { toast } from "sonner";
import FillButton from "../../../common/FillButton";

export default function RegistrationForm({ agree }) {
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "", 
    educationalQualification: "",
    hscPassingYear: "", 
    religion: "",
    gender: "",
    bloodGroup: "",
    facebookLink: "",
    district: "",
    deliveryAddress: "",
    tShirtSize: "",
    eventType: [], 
    occupation: "",
    preferableRunningDistance: [], 
    preferableEventLocation: [], 
    whyJoin: "",
    wantsToJoinTeam: false, 
    joinTeamReason: "",
    interested: [], 
    recommendationMessage: "",
    memberImage: null 
  });

  console.log("FORM DATA:", formData);

  const handleMemberSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      { key: "gender", label: "Gender" },
      { key: "bloodGroup", label: "Blood Group" },
      { key: "tShirtSize", label: "T-Shirt Size" },
    ];

    for (const field of requiredFields) {
      if (!formData[field.key]) {
        toast.error(`Please select your ${field.label}`);
        return;
      }
    }

    setLoading(true);

    const payload = new FormData();

    Object.keys(formData).forEach((key) => {
      const value = formData[key];

      if (value !== null && value !== undefined && value !== "") {
        // FIX 1: Turn arrays into single comma-separated strings as expected by the backend
        if (Array.isArray(value)) {
          payload.append(key, value.join(","));
        } 
        // Ensure booleans are cleanly passed as standard string configurations
        else if (typeof value === "boolean") {
          payload.append(key, value ? "true" : "false");
        } 
        // Explicitly format into standard integer types
        else if (key === "hscPassingYear") {
          payload.append(key, Number(value));
        } 
        // FIX 2: Sanitize and rebuild broken date year selections (e.g., '0195' -> '1995')
        else if (key === "birthDate") {
          const dateParts = value.split("-");
          if (dateParts[0] && dateParts[0].length === 4 && dateParts[0].startsWith("01")) {
            const correctedYear = dateParts[0].replace(/^01/, "19");
            payload.append(key, `${correctedYear}-${dateParts[1] || "01"}-${dateParts[2] || "01"}`);
          } else {
            payload.append(key, value);
          }
        } 
        else {
          payload.append(key, value);
        }
      } else if (typeof value === "boolean") {
        payload.append(key, "false");
      }
    });

    try {
      const response = await registerMember(payload);
      console.log("SERVER RESPONSE:", response);

      if (response?.statusCode !== 201) {
        toast.error(response?.message || "Registration failed");
        return;
      }

      setIsFormOpen(false);
      setIsPayOpen(true);
      toast.success("Registration successful 🎉");

    } catch (error) {
      console.log("FULL ERROR DETAILS:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          <FillButton
            disabled={!agree}
            className={`${!agree ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Register Now
          </FillButton>
        </DialogTrigger>

        <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto p-6 md:p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Register as Member
            </DialogTitle>
          </DialogHeader>

          <MemberForm 
            onSubmit={handleMemberSubmit} 
            formData={formData} 
            setFormData={setFormData} 
            loading={loading} 
          />
        </DialogContent>
      </Dialog>

      <MemPayModal setOpen={setIsPayOpen} open={isPayOpen} />
    </>
  );
}