"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import FillButton from "./FillButton";

export default function RegistrationForm() {
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

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Personal Info Section */}
          <h3 className="md:col-span-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
            Personal Information
          </h3>

          <div className="flex flex-col gap-1.5">
            <Label>Full Name</Label>
            <Input
              placeholder="Full Name"
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Phone Number (WhatsApp)</Label>
            <Input
              placeholder="Phone Number"
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="Email Address"
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Facebook Profile Link</Label>
            <Input
              placeholder="Facebook Profile Link"
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Gender</Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Date of Birth</Label>
            <Input type="date" className="w-full bg-gray-50 dark:bg-gray-800" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Age</Label>
            <Input
              type="number"
              placeholder="Age"
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>District</Label>
            <Input
              placeholder="District"
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-1.5">
            <Label>Delivery Address</Label>
            <Input
              placeholder="Delivery Address"
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Event Info Section */}
          <h3 className="md:col-span-2 mt-6 text-lg font-semibold text-gray-700 dark:text-gray-200">
            Event Information
          </h3>

          <div className="flex flex-col gap-1.5">
            <Label>T-Shirt Size</Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="xs">XS</SelectItem>
                <SelectItem value="s">S</SelectItem>
                <SelectItem value="m">M</SelectItem>
                <SelectItem value="l">L</SelectItem>
                <SelectItem value="xl">XL</SelectItem>
                <SelectItem value="xxl">XXL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Event Type</Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="road">Road Run</SelectItem>
                <SelectItem value="trail">Trail Run</SelectItem>
                <SelectItem value="fun">Fun Run</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Occupation</Label>
            <Input
              placeholder="Occupation"
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Special Skills</Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
                <SelectValue placeholder="Select skill" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="organizing">Organizing</SelectItem>
                <SelectItem value="volunteering">Volunteering</SelectItem>
                <SelectItem value="medical">Medical Support</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-1.5">
            <Label>Preferable Running / Marathon Distance</Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
                <SelectValue placeholder="Select distance" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="5k">5 KM</SelectItem>
                <SelectItem value="10k">10 KM</SelectItem>
                <SelectItem value="21k">Half Marathon</SelectItem>
                <SelectItem value="42k">Full Marathon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-1.5">
            <Label>Organizer / Moderator / Co-Admin</Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-1.5">
            <Label>Participated in how many events?</Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
                <SelectValue placeholder="Select number" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1-3">1–3</SelectItem>
                <SelectItem value="4-10">4–10</SelectItem>
                <SelectItem value="10+">10+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Recommendation */}
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <Label>Any recommendation or ideas?</Label>
            <Textarea
              placeholder="Write your thoughts..."
              rows={4}
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* File Upload */}
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <Label>Upload File</Label>
            <Input type="file" className="w-full bg-gray-50 dark:bg-gray-800" />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end pt-4">
            <FillButton>Submit</FillButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
