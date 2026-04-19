"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { registerOrganizer } from "@/services/organizer.service";
import { useState } from "react";
import { toast } from "sonner";

export default function OrganizerRegForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    organizationName: "",
    organizationType: "",
    primaryRepresentative: "",
    officialEmail: "",
    officialPhone: "",
    registrationNumber: "",
    tinNumber: "",
    officeAddress: "",
    socialMediaLink: "",
    totalEventsOrganized: "",
    averageParticipantSize: "",
    preferredEventZone: "",
    whyJoinUs: "",
    bankName: "",
    bankBranch: "",
    bankAccountName: "",
    bankAccountNumber: "",
    preferredPayoutCycle: "",
    organizationLogo: null,
    nidOrPassportCopy: null,
    companyProfilePdf: null,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFile = (field, file) => {
    setForm((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== "") {
          payload.append(key, form[key]);
        }
      });

      const res = await registerOrganizer(payload);

      if (res?.statusCode !== 201) {
        toast.error(res?.message || "Registration failed");
        return;
      }

      toast.success("Organizer registration successful 🎉");

    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Organization Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label>Organization Name *</label>
          <Input onChange={(e) => handleChange("organizationName", e.target.value)} />
        </div>

        <div>
          <label>Organization Type *</label>
          <Input onChange={(e) => handleChange("organizationType", e.target.value)} />
        </div>

        <div>
          <label>Primary Representative *</label>
          <Input onChange={(e) => handleChange("primaryRepresentative", e.target.value)} />
        </div>

        <div>
          <label>Official Email *</label>
          <Input type="email" onChange={(e) => handleChange("officialEmail", e.target.value)} />
        </div>

        <div>
          <label>Official Phone *</label>
          <Input onChange={(e) => handleChange("officialPhone", e.target.value)} />
        </div>

        <div>
          <label>Registration Number *</label>
          <Input onChange={(e) => handleChange("registrationNumber", e.target.value)} />
        </div>

        <div>
          <label>TIN Number *</label>
          <Input onChange={(e) => handleChange("tinNumber", e.target.value)} />
        </div>

        <div className="md:col-span-2">
          <label>Office Address *</label>
          <Textarea onChange={(e) => handleChange("officeAddress", e.target.value)} />
        </div>

        <div className="md:col-span-2">
          <label>Social Media Link</label>
          <Input onChange={(e) => handleChange("socialMediaLink", e.target.value)} />
        </div>
      </div>

      {/* Event Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label>Total Events Organized</label>
          <Input type="number" onChange={(e) => handleChange("totalEventsOrganized", e.target.value)} />
        </div>

        <div>
          <label>Average Participant Size</label>
          <Input onChange={(e) => handleChange("averageParticipantSize", e.target.value)} />
        </div>

        <div>
          <label>Preferred Event Zone</label>
          <Input onChange={(e) => handleChange("preferredEventZone", e.target.value)} />
        </div>

        <div className="md:col-span-2">
          <label>Why Join Us</label>
          <Textarea onChange={(e) => handleChange("whyJoinUs", e.target.value)} />
        </div>
      </div>

      {/* Bank Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label>Bank Name *</label>
          <Input onChange={(e) => handleChange("bankName", e.target.value)} />
        </div>

        <div>
          <label>Bank Branch *</label>
          <Input onChange={(e) => handleChange("bankBranch", e.target.value)} />
        </div>

        <div>
          <label>Account Name *</label>
          <Input onChange={(e) => handleChange("bankAccountName", e.target.value)} />
        </div>

        <div>
          <label>Account Number *</label>
          <Input onChange={(e) => handleChange("bankAccountNumber", e.target.value)} />
        </div>

        <div>
          <label>Payout Cycle *</label>
          <Select onValueChange={(val) => handleChange("preferredPayoutCycle", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select cycle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Files */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label>Organization Logo *</label>
          <Input type="file" onChange={(e) => handleFile("organizationLogo", e.target.files[0])} />
        </div>

        <div>
          <label>NID / Passport *</label>
          <Input type="file" onChange={(e) => handleFile("nidOrPassportCopy", e.target.files[0])} />
        </div>

        <div>
          <label>Company Profile PDF *</label>
          <Input type="file" onChange={(e) => handleFile("companyProfilePdf", e.target.files[0])} />
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit Registration"}
      </Button>
    </form>
  );
}