"use client";

import FillButton from "@/app/components/common/FillButton";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { useState } from "react";

const religionOptions = ["Muslim", "Hindu", "Christian", "Buddhist", "Others"];
const bloodGroupOptions = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const eventTypeOptions = ["Running", "Cycling", "Swimming", "Cricket", "Football", "Badminton", "Others"];
const runningDistanceOptions = ["Ultra Marathon", "Marathon", "Half Marathon", "Short Distance Races (7.5, 10 & 15K)"];
const eventLocationOptions = ["Live Events", "Virtual Events", "International Events"];

const tshirtOptions = [
  { label: 'XS (Chest: 36", Length: 25")', value: "XS" },
  { label: 'S (Chest: 38", Length: 26")', value: "S" },
  { label: 'M (Chest: 40", Length: 27")', value: "M" },
  { label: 'L (Chest: 42", Length: 28")', value: "L" },
  { label: 'XL (Chest: 44", Length: 29")', value: "XL" },
  { label: '2XL (Chest: 46", Length: 30")', value: "2XL" },
  { label: '3XL (Chest: 48", Length: 31")', value: "3XL" },
  { label: '4XL (Chest: 50", Length: 32")', value: "4XL" },
];

export default function MemberForm({ onSubmit, formData, setFormData, loading }) {
  const [currentInterest, setCurrentInterest] = useState("");

  const handleCheckboxChange = (field, optionValue, isChecked) => {
    const currentArray = formData[field] || [];
    if (isChecked) {
      setFormData({ ...formData, [field]: [...currentArray, optionValue] });
    } else {
      setFormData({ ...formData, [field]: currentArray.filter((item) => item !== optionValue) });
    }
  };

  const handleAddToArray = (field, value, clearInput) => {
    if (!value.trim()) return;
    if (!(formData[field] || []).includes(value.trim())) {
      setFormData({ ...formData, [field]: [...(formData[field] || []), value.trim()] });
    }
    clearInput("");
  };

  const handleRemoveFromArray = (field, valueToRemove) => {
    setFormData({ ...formData, [field]: (formData[field] || []).filter((item) => item !== valueToRemove) });
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <h3 className="md:col-span-2 text-lg font-semibold text-gray-700 dark:text-gray-200 border-b pb-2">
        Member Profile Information
      </h3>

      {/* name */}
      <div className="flex flex-col gap-1.5">
        <Label>Name</Label>
        <Input
          required
          type="text"
          value={formData.name || ""}
          placeholder="John Doe"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* email */}
      <div className="flex flex-col gap-1.5">
        <Label>Email Address</Label>
        <Input
          required
          type="email"
          value={formData.email || ""}
          placeholder="john@example.com"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* phone */}
      <div className="flex flex-col gap-1.5">
        <Label>Contact Number</Label>
        <Input
          required
          type="tel"
          value={formData.phone || ""}
          placeholder="+8801712345678"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* birthDate */}
      <div className="flex flex-col gap-1.5">
        <Label>Birth Date</Label>
        <Input
          required
          type="date"
          value={formData.birthDate || ""}
          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* educationalQualification */}
      <div className="flex flex-col gap-1.5">
        <Label>Educational Qualifications</Label>
        <Input
          type="text"
          value={formData.educationalQualification || ""}
          placeholder="BSc in Computer Science"
          onChange={(e) => setFormData({ ...formData, educationalQualification: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* hscPassingYear */}
      <div className="flex flex-col gap-1.5">
        <Label>HSC Passing Year</Label>
        <Input
          type="number"
          value={formData.hscPassingYear || ""}
          placeholder="2020"
          onChange={(e) => setFormData({ ...formData, hscPassingYear: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* religion */}
      <div className="flex flex-col gap-1.5">
        <Label>Religion</Label>
        <Select 
          value={formData.religion || ""} 
          onValueChange={(val) => setFormData({ ...formData, religion: val })}
        >
          <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
            <SelectValue placeholder="Select Religion" />
          </SelectTrigger>
          <SelectContent>
            {religionOptions.map((religion) => (
              <SelectItem key={religion} value={religion}>{religion}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* gender */}
      <div className="flex flex-col gap-1.5">
        <Label>Gender</Label>
        <Select 
          value={formData.gender || ""} 
          onValueChange={(val) => setFormData({ ...formData, gender: val })}
        >
          <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* bloodGroup */}
      <div className="flex flex-col gap-1.5">
        <Label>Blood Group</Label>
        <Select 
          value={formData.bloodGroup || ""} 
          onValueChange={(val) => setFormData({ ...formData, bloodGroup: val })}
        >
          <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
            <SelectValue placeholder="Select Blood Group" />
          </SelectTrigger>
          <SelectContent>
            {bloodGroupOptions.map((bg) => (
              <SelectItem key={bg} value={bg}>{bg}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* facebookLink */}
      <div className="flex flex-col gap-1.5">
        <Label>Facebook Profile Link</Label>
        <Input
          type="url"
          value={formData.facebookLink || ""}
          placeholder="https://facebook.com/john.dev"
          onChange={(e) => setFormData({ ...formData, facebookLink: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* district */}
      <div className="flex flex-col gap-1.5">
        <Label>Home District</Label>
        <Input
          type="text"
          value={formData.district || ""}
          placeholder="Dhaka"
          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* deliveryAddress */}
      <div className="md:col-span-2 flex flex-col gap-1.5">
        <Label>Delivery Address</Label>
        <Input
          type="text"
          value={formData.deliveryAddress || ""}
          placeholder="House 22, Road 4, Banani"
          onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* tShirtSize */}
      <div className="flex flex-col gap-1.5">
        <Label>T-Shirt Size</Label>
        <Select 
          value={formData.tShirtSize || ""} 
          onValueChange={(val) => setFormData({ ...formData, tShirtSize: val })}
        >
          <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {tshirtOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* occupation */}
      <div className="flex flex-col gap-1.5">
        <Label>Occupation</Label>
        <Input
          type="text"
          value={formData.occupation || ""}
          placeholder="Software Engineer"
          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      <h3 className="md:col-span-2 text-lg font-semibold text-gray-700 dark:text-gray-200 border-b pb-2 mt-4">
        Event Preferences & Involvement
      </h3>

      {/* eventType */}
      <div className="flex flex-col gap-2.5 md:col-span-2">
        <Label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Preferable Event Type</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
          {eventTypeOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2.5">
              <Checkbox 
                id={`event-${option}`}
                checked={(formData.eventType || []).includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange("eventType", option, !!checked)}
              />
              <label htmlFor={`event-${option}`} className="text-sm font-medium leading-none text-gray-600 dark:text-gray-400 cursor-pointer select-none">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* preferableRunningDistance */}
      <div className="flex flex-col gap-2.5 md:col-span-2">
        <Label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Running Distance Preference</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
          {runningDistanceOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2.5">
              <Checkbox 
                id={`distance-${option}`}
                checked={(formData.preferableRunningDistance || []).includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange("preferableRunningDistance", option, !!checked)}
              />
              <label htmlFor={`distance-${option}`} className="text-sm font-medium leading-none text-gray-600 dark:text-gray-400 cursor-pointer select-none">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* preferableEventLocation */}
      <div className="flex flex-col gap-2.5 md:col-span-2">
        <Label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Event Location Preference</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
          {eventLocationOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2.5">
              <Checkbox 
                id={`location-${option}`}
                checked={(formData.preferableEventLocation || []).includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange("preferableEventLocation", option, !!checked)}
              />
              <label htmlFor={`location-${option}`} className="text-sm font-medium leading-none text-gray-600 dark:text-gray-400 cursor-pointer select-none">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* whyJoin */}
      <div className="md:col-span-2 flex flex-col gap-1.5">
        <Label>Why Do you want to Join RunRise Nation?</Label>
        <Textarea
          value={formData.whyJoin || ""}
          placeholder="Share your goals, why you love the athletic community, or what drives your commitment..."
          rows={3}
          onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* wantsToJoinTeam */}
      <div className="flex flex-col gap-1.5">
        <Label>Do you want to Join RRN Event Management Volunteer or Core Team?</Label>
        <Select 
          value={formData.wantsToJoinTeam ? "true" : "false"} 
          onValueChange={(val) => setFormData({ ...formData, wantsToJoinTeam: val === "true" })}
        >
          <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* joinTeamReason */}
      <div className="md:col-span-2 flex flex-col gap-1.5">
        <Label>Why do you have interest to join Volunteer or Core Team?</Label>
        <Textarea
          value={formData.joinTeamReason || ""}
          placeholder="I have experience managing events..."
          rows={2}
          onChange={(e) => setFormData({ ...formData, joinTeamReason: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* interested */}
      <div className="flex flex-col gap-1.5 md:col-span-2">
        <Label>Interested In (Add fields like Core Organizing, Tech Team, Media etc.)</Label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={currentInterest}
            placeholder="e.g. Media Operations"
            onChange={(e) => setCurrentInterest(e.target.value)}
            className="bg-gray-50 dark:bg-gray-800"
          />
          <button
            type="button"
            onClick={() => handleAddToArray("interested", currentInterest, setCurrentInterest)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          {formData.interested?.map((interest, idx) => (
            <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-800 border rounded-full text-xs font-medium">
              {interest}
              <button type="button" onClick={() => handleRemoveFromArray("interested", interest)} className="text-red-500 font-bold hover:text-red-700 ml-1">×</button>
            </span>
          ))}
        </div>
      </div>

      {/* recommendationMessage */}
      <div className="md:col-span-2 flex flex-col gap-1.5">
        <Label>Your Ideas or Recommendations</Label>
        <Input
          type="text"
          value={formData.recommendationMessage || ""}
          placeholder="Excited to join the event"
          onChange={(e) => setFormData({ ...formData, recommendationMessage: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* memberImage */}
      <div className="md:col-span-2 flex flex-col gap-1.5">
        <Label>Member Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, memberImage: e.target.files[0] || null })}
          className="w-full bg-gray-50 dark:bg-gray-800 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
        />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2 flex justify-end pt-4">
        <FillButton type="submit" disabled={loading}>
          {loading ? "Registering..." : "Submit Registration"}
        </FillButton>
      </div>
    </form>
  );
}