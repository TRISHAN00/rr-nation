"use client";

import MemberForm from "@/app/(frontend)/member-register/_components/MemberForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useState } from "react";
import FillButton from "./FillButton";

export default function RegistrationForm() {
  const [error, setError] = useState()

  const handleMemberSubmit = (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      

    } catch(error) {
      console.log(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FillButton>Register Now</FillButton>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto p-6 md:p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Register as Member
          </DialogTitle>
        </DialogHeader>

        <MemberForm/>
      </DialogContent>
    </Dialog>
  );
}
