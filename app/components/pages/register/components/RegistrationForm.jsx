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
  const [open, setOpen] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);


  const [formData, setFormData] = useState({
    facebookLink: "",
    age: 0,
    district: "",
    deliveryAddress: "",
    tShirtSize: "",
    eventType: "",
    occupation: "string",
    specialSkill: "",
    preferableRunningDistance: "",
    isEventStaff: false,
    eventsParticipatedNumber: 0,
    recommendationMessage: "",
    memberImage: null
  });

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Transform state object into FormData for multipart/form-data
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      // Only append fields that are not null/undefined
      if (value !== null && value !== undefined) {
        payload.append(key, value);
      }
    });

    try {
      // 2. Send the FormData instance, NOT the state object
      const response = await registerMember(payload);
      console.log(response)

      // 3. Keep your requested logic pattern
      if (response?.statusCode !== 201) {
        toast.error(response?.message || "Registration failed");
        return;
      } else {
        setOpen(true);
      }

      setIsFormOpen(false);
      setIsPayOpen(true);

      toast.success("Registration successful 🎉");

      // Optional: Reset form or close modal here
    } catch (error) {
      console.log("FULL ERROR:", error);

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
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen} >
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

          <MemberForm onSubmit={handleMemberSubmit} formData={formData} setFormData={setFormData} loading={loading} />
        </DialogContent>
      </Dialog>

      <MemPayModal setOpen={setIsPayOpen} open={isPayOpen} />
    </>
  );
}
