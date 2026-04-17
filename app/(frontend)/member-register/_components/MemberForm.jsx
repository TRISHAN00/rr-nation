"use client";

import FillButton from "@/app/components/common/FillButton";
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

const tshirtOptions = [
  { label: 'XS (Chest: 36", Length: 25")', value: "XS" },
  { label: 'S (Chest: 38", Length: 26")', value: "S" },
  { label: 'M (Chest: 40", Length: 27")', value: "M" },
  { label: 'L (Chest: 42", Length: 28")', value: "L" },
  { label: 'XL (Chest: 44", Length: 29")', value: "XL" },
  { label: '2XL (Chest: 46", Length: 30")', value: "2XL" },
  { label: '3XL (Chest: 48", Length: 31")', value: "3XL" },
  { label: '4XL (Chest: 50", Length: 32")', value: "4XL" },
  { label: '3-4 Years (Chest: 26", Length: 18")', value: "3-4 Years" },
  { label: '5-6 Years (Chest: 28", Length: 19")', value: "5-6 Years" },
  { label: '7-8 Years (Chest: 30", Length: 20")', value: "7-8 Years" },
  { label: '9-10 Years (Chest: 32", Length: 22")', value: "9-10 Years" },
  { label: '11-12 Years (Chest: 34", Length: 24")', value: "11-12 Years" },
];

export default function MemberForm({onSubmit, formData, setFormData, loading}) {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <h3 className="md:col-span-2 text-lg font-semibold text-gray-700 dark:text-gray-200 border-b pb-2">
        Member Registration
      </h3>

      {/* facebookLink */}
      <div className="flex flex-col gap-1.5">
        <Label>Facebook Profile Link</Label>
        <Input
          required
          name="facebookLink"
          val={formData.facebookLink}
          placeholder="https://facebook.com/..."
          onChange={(e) => setFormData({ ...formData, facebookLink: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* age */}
      <div className="flex flex-col gap-1.5">
        <Label>Age</Label>
        <Input
          required
          type="number"
          placeholder="Enter age"
          onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* district */}
      <div className="flex flex-col gap-1.5">
        <Label>District</Label>
        <Input
          required
          placeholder="Your District"
          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* tShirtSize */}
      <div className="flex flex-col gap-1.5">
        <Label>T-Shirt Size</Label>
        <Select onValueChange={(val) => setFormData({ ...formData, tShirtSize: val })}>
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

      {/* deliveryAddress */}
      <div className="md:col-span-2 flex flex-col gap-1.5">
        <Label>Delivery Address</Label>
        <Input
          required
          placeholder="House, Street, Area..."
          onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* eventType */}
      <div className="flex flex-col gap-1.5">
        <Label>Event Type</Label>
        <Input
          placeholder="e.g. Marathon"
          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* occupation */}
      <div className="flex flex-col gap-1.5">
        <Label>Occupation</Label>
        <Input
          placeholder="Your Profession"
          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* specialSkill */}
      <div className="flex flex-col gap-1.5">
        <Label>Special Skill</Label>
        <Input
          placeholder="e.g. Photography"
          onChange={(e) => setFormData({ ...formData, specialSkill: e.target.value })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* preferableRunningDistance */}
      <div className="flex flex-col gap-1.5">
        <Label>Preferable Running Distance (KM)</Label>
        <Input
          type="number"
          placeholder="e.g. 10"
          onChange={(e) => setFormData({ ...formData, preferableRunningDistance: Number(e.target.value) })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* isEventStaff */}
      <div className="flex flex-col gap-1.5">
        <Label>Interested in being Event Staff?</Label>
        <Select onValueChange={(val) => setFormData({ ...formData, isEventStaff: val === "true" })}>
          <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
            <SelectValue placeholder="Select Option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* eventsParticipatedNumber */}
      <div className="flex flex-col gap-1.5">
        <Label>Events Participated (Number)</Label>
        <Input
          type="number"
          placeholder="0"
          onChange={(e) => setFormData({ ...formData, eventsParticipatedNumber: Number(e.target.value) })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      {/* recommendationMessage */}
      <div className="md:col-span-2 flex flex-col gap-1.5">
        <Label>Recommendation / Ideas</Label>
        <Textarea
          placeholder="Share your thoughts..."
          rows={3}
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
          onChange={(e) => setFormData({ ...formData, memberImage: e.target.files[0] })}
          className="w-full bg-gray-50 dark:bg-gray-800"
        />
      </div>

      <div className="md:col-span-2 flex justify-end pt-4">
        <FillButton type="submit" disabled={loading}>
          {loading ? "Registering..." : "Submit Registration"}
        </FillButton>
      </div>
    </form>
  );
}