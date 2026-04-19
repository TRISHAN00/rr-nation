"use client";

import FillButton from "@/app/components/common/FillButton";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
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
import StepperProgress from "./StepperProgress";

const steps = [
  "Organization",
  "Event Info",
  "Bank Info",
  "Documents",
];

export default function OrganizerRegModal({ agree }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
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

  const validateStep = () => {
    if (step === 0) {
      const required = ["organizationName", "organizationType", "primaryRepresentative", "officialEmail", "officialPhone", "registrationNumber", "tinNumber", "officeAddress"];
      if (required.some(key => !form[key])) {
        toast.error("Fill all required organization fields");
        return false;
      }
    }

    if (step === 2) {
      const required = ["bankName", "bankBranch", "bankAccountName", "bankAccountNumber", "preferredPayoutCycle"];
      if (required.some(key => !form[key])) {
        toast.error("Complete bank information");
        return false;
      }
    }

    if (step === 3) {
      if (!form.organizationLogo || !form.nidOrPassportCopy || !form.companyProfilePdf) {
        toast.error("Upload all required documents");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      setLoading(true);
      const payload = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) payload.append(key, form[key]);
      });

      const res = await registerOrganizer(payload);

      if (res?.statusCode !== 201) {
        toast.error(res?.message || "Registration failed");
        return;
      }

      toast.success("Organizer registered 🎉");
      setOpen(false);
      setStep(0);
      // Reset form if you want a fresh start for the next user session
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FillButton
          disabled={!agree}
          className={`${!agree ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Register Now
        </FillButton>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Organizer Registration</DialogTitle>
        </DialogHeader>

        {/* Progress Stepper */}
        <StepperProgress steps={steps} step={step} />

        {/* STEP 1: Organization */}
        {step === 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Organization Name *">
              <Input value={form.organizationName} onChange={(e) => handleChange("organizationName", e.target.value)} />
            </Field>
            <Field label="Organization Type *">
              <Input value={form.organizationType} onChange={(e) => handleChange("organizationType", e.target.value)} />
            </Field>
            <Field label="Primary Representative *">
              <Input value={form.primaryRepresentative} onChange={(e) => handleChange("primaryRepresentative", e.target.value)} />
            </Field>
            <Field label="Official Email *">
              <Input type="email" value={form.officialEmail} onChange={(e) => handleChange("officialEmail", e.target.value)} />
            </Field>
            <Field label="Official Phone *">
              <Input value={form.officialPhone} onChange={(e) => handleChange("officialPhone", e.target.value)} />
            </Field>
            <Field label="Registration Number *">
              <Input value={form.registrationNumber} onChange={(e) => handleChange("registrationNumber", e.target.value)} />
            </Field>
            <Field label="TIN Number *">
              <Input value={form.tinNumber} onChange={(e) => handleChange("tinNumber", e.target.value)} />
            </Field>
            <Field label="Office Address *" className="md:col-span-2">
              <Textarea value={form.officeAddress} onChange={(e) => handleChange("officeAddress", e.target.value)} />
            </Field>
          </div>
        )}

        {/* STEP 2: Event Info */}
        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Total Events Organized">
              <Input type="number" value={form.totalEventsOrganized} onChange={(e) => handleChange("totalEventsOrganized", e.target.value)} />
            </Field>
            <Field label="Average Participant Size">
              <Input value={form.averageParticipantSize} onChange={(e) => handleChange("averageParticipantSize", e.target.value)} />
            </Field>
            <Field label="Preferred Event Zone">
              <Input value={form.preferredEventZone} onChange={(e) => handleChange("preferredEventZone", e.target.value)} />
            </Field>
            <Field label="Why Join Us" className="md:col-span-2">
              <Textarea value={form.whyJoinUs} onChange={(e) => handleChange("whyJoinUs", e.target.value)} />
            </Field>
          </div>
        )}

        {/* STEP 3: Bank Info */}
        {step === 2 && (
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Bank Name *">
              <Input value={form.bankName} onChange={(e) => handleChange("bankName", e.target.value)} />
            </Field>
            <Field label="Bank Branch *">
              <Input value={form.bankBranch} onChange={(e) => handleChange("bankBranch", e.target.value)} />
            </Field>
            <Field label="Account Name *">
              <Input value={form.bankAccountName} onChange={(e) => handleChange("bankAccountName", e.target.value)} />
            </Field>
            <Field label="Account Number *">
              <Input value={form.bankAccountNumber} onChange={(e) => handleChange("bankAccountNumber", e.target.value)} />
            </Field>
            <Field label="Payout Cycle *">
              <Select value={form.preferredPayoutCycle} onValueChange={(val) => handleChange("preferredPayoutCycle", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        )}

        {/* STEP 4: Documents */}
        {step === 3 && (
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Organization Logo *">
              <Input type="file" onChange={(e) => handleFile("organizationLogo", e.target.files[0])} />
              {form.organizationLogo && <p className="text-xs text-brand mt-1">✓ {form.organizationLogo.name}</p>}
            </Field>
            <Field label="NID / Passport *">
              <Input type="file" onChange={(e) => handleFile("nidOrPassportCopy", e.target.files[0])} />
              {form.nidOrPassportCopy && <p className="text-xs text-brand mt-1">✓ {form.nidOrPassportCopy.name}</p>}
            </Field>
            <Field label="Company Profile PDF *">
              <Input type="file" onChange={(e) => handleFile("companyProfilePdf", e.target.files[0])} />
              {form.companyProfilePdf && <p className="text-xs text-brand mt-1">✓ {form.companyProfilePdf.name}</p>}
            </Field>
          </div>
        )}

        {/* NAVIGATION */}
        <div className="flex justify-between mt-6">
          {step > 0 && (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          )}

          {step < steps.length - 1 ? (
            <Button onClick={nextStep} className="ml-auto">Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading} className="ml-auto">
              {loading ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <div className={className}>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      {children}
    </div>
  );
}