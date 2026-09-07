"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { Textarea } from "@/app/components/ui/textarea";
import { updateMember } from "@/services/admin/admin.member.service";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";

export default function EditMemberModal({ open, setOpen, member, onRefresh }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    birthDate: "",
    bloodGroup: "",
    religion: "",
    occupation: "",
    educationalQualification: "",
    hscPassingYear: "",
    district: "",
    deliveryAddress: "",
    facebookLink: "",
    tShirtSize: "",
    memberType: "",
    eventType: "",
    preferableRunningDistance: "",
    preferableEventLocation: "",
    eventsParticipatedNumber: "",
    specialSkill: "",
    isEventStaff: false,
    wantsToJoinTeam: false,
    interested: "",
    joinTeamReason: "",
    whyJoin: "",
    recommendationMessage: "",
    adminApproval: "",
  });

  const [memberImage, setMemberImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (member && open) {
      setForm({
        name: member.name || "",
        email: member.email || "",
        phone: member.phone || "",
        gender: member.gender || "",
        birthDate: member.birthDate
          ? new Date(member.birthDate).toISOString().split("T")[0]
          : "",
        bloodGroup: member.bloodGroup || "",
        religion: member.religion || "",
        occupation: member.occupation || "",
        educationalQualification: member.educationalQualification || "",
        hscPassingYear: member.hscPassingYear || "",
        district: member.district || "",
        deliveryAddress: member.deliveryAddress || "",
        facebookLink: member.facebookLink || "",
        tShirtSize: member.tShirtSize || "",
        memberType: member.memberType || "",
        eventType: Array.isArray(member.eventType) ? member.eventType.join(", ") : member.eventType || "",
        preferableRunningDistance: Array.isArray(member.preferableRunningDistance) ? member.preferableRunningDistance.join(", ") : member.preferableRunningDistance || "",
        preferableEventLocation: Array.isArray(member.preferableEventLocation) ? member.preferableEventLocation.join(", ") : member.preferableEventLocation || "",
        eventsParticipatedNumber: member.eventsParticipatedNumber || "",
        specialSkill: Array.isArray(member.specialSkill) ? member.specialSkill.join(", ") : member.specialSkill || "",
        isEventStaff: member.isEventStaff || false,
        wantsToJoinTeam: member.wantsToJoinTeam || false,
        interested: Array.isArray(member.interested)
          ? member.interested.join(", ")
          : member.interested || "",
        joinTeamReason: member.joinTeamReason || "",
        whyJoin: member.whyJoin || "",
        recommendationMessage: member.recommendationMessage || "",
        adminApproval: member.adminApproval || "pending",
      });
      setPreview(member.memberImage || null);
    }
  }, [member, open]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMemberImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setMemberImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const safeStr = (val) => (Array.isArray(val) ? val.join(", ") : String(val || ""));
  const trimStr = (val) => safeStr(val).trim();

  const handleSubmit = async () => {
    if (!member) return;
    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("memberId", String(member.memberId || member.id));
      payload.append("name", trimStr(form.name));
      payload.append("email", trimStr(form.email));
      payload.append("phone", trimStr(form.phone));
      payload.append("gender", form.gender);
      payload.append("birthDate", form.birthDate);
      payload.append("bloodGroup", form.bloodGroup);
      payload.append("religion", trimStr(form.religion));
      payload.append("occupation", trimStr(form.occupation));
      payload.append("educationalQualification", trimStr(form.educationalQualification));
      payload.append("hscPassingYear", form.hscPassingYear);
      payload.append("district", trimStr(form.district));
      payload.append("deliveryAddress", trimStr(form.deliveryAddress));
      payload.append("facebookLink", trimStr(form.facebookLink));
      payload.append("tShirtSize", form.tShirtSize);
      payload.append("memberType", form.memberType);
      payload.append("eventType", trimStr(form.eventType));
      payload.append("preferableRunningDistance", trimStr(form.preferableRunningDistance));
      payload.append("preferableEventLocation", trimStr(form.preferableEventLocation));
      payload.append("eventsParticipatedNumber", String(form.eventsParticipatedNumber));
      payload.append("specialSkill", trimStr(form.specialSkill));
      payload.append("isEventStaff", String(form.isEventStaff));
      payload.append("wantsToJoinTeam", String(form.wantsToJoinTeam));
      payload.append("interested", safeStr(form.interested));
      payload.append("joinTeamReason", trimStr(form.joinTeamReason));
      payload.append("whyJoin", trimStr(form.whyJoin));
      payload.append("recommendationMessage", trimStr(form.recommendationMessage));
      payload.append("adminApproval", form.adminApproval);
      if (memberImage) {
        payload.append("memberImage", memberImage);
      } else if (preview === null) {
        payload.append("memberImage", "");
      }

      await updateMember(payload);

      resetForm();
      setOpen(false);
      toast.success("Member updated successfully!");
      if (onRefresh) onRefresh();
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update member";
      if (msg.toLowerCase().includes("already approved")) {
        toast.warning("Member is already approved. Change the approval status first.");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) resetForm();
      }}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Image */}
          <div>
            <Label className="mb-2 block">Profile Image</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
            {preview ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border border-border">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setMemberImage(null);
                    setPreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute top-0 right-0 rounded-full bg-black/60 p-1 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-24 h-24 rounded-full border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-brand hover:text-brand transition-colors"
              >
                <ImagePlus className="h-6 w-6" />
                <span className="text-[10px] font-medium">Upload</span>
              </button>
            )}
          </div>

          {/* Personal Info */}
          <div>
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Personal Information</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label>Full Name</Label>
                <Input
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Phone</Label>
                <Input
                  placeholder="+8801712345678"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Gender</Label>
                <Select value={form.gender} onValueChange={(v) => handleChange("gender", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Birth Date</Label>
                <Input
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => handleChange("birthDate", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Blood Group</Label>
                <Select value={form.bloodGroup} onValueChange={(v) => handleChange("bloodGroup", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Religion</Label>
                <Input
                  placeholder="Islam"
                  value={form.religion}
                  onChange={(e) => handleChange("religion", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Occupation</Label>
                <Input
                  placeholder="Software Engineer"
                  value={form.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Educational Qualification</Label>
                <Input
                  placeholder="BSc in CS"
                  value={form.educationalQualification}
                  onChange={(e) => handleChange("educationalQualification", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>HSC Passing Year</Label>
                <Input
                  placeholder="2020"
                  value={form.hscPassingYear}
                  onChange={(e) => handleChange("hscPassingYear", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>District</Label>
                <Input
                  placeholder="Dhaka"
                  value={form.district}
                  onChange={(e) => handleChange("district", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>T-Shirt Size</Label>
                <Select value={form.tShirtSize} onValueChange={(v) => handleChange("tShirtSize", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <Label>Delivery Address</Label>
            <Input
              placeholder="House 22, Road 4, Banani"
              value={form.deliveryAddress}
              onChange={(e) => handleChange("deliveryAddress", e.target.value)}
            />
          </div>

          {/* Social */}
          <div className="space-y-1">
            <Label>Facebook Link</Label>
            <Input
              placeholder="https://facebook.com/username"
              value={form.facebookLink}
              onChange={(e) => handleChange("facebookLink", e.target.value)}
            />
          </div>

          {/* Athletic Profile */}
          <div>
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Athletic Profile</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label>Event Type</Label>
                <Input
                  placeholder="Workshop, Seminar"
                  value={form.eventType}
                  onChange={(e) => handleChange("eventType", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Preferable Running Distance</Label>
                <Input
                  placeholder="5K, 10K, Half Marathon"
                  value={form.preferableRunningDistance}
                  onChange={(e) => handleChange("preferableRunningDistance", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Preferable Event Location</Label>
                <Input
                  placeholder="Dhaka, Chittagong"
                  value={form.preferableEventLocation}
                  onChange={(e) => handleChange("preferableEventLocation", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Events Participated</Label>
                <Input
                  type="number"
                  placeholder="5"
                  value={form.eventsParticipatedNumber}
                  onChange={(e) => handleChange("eventsParticipatedNumber", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Special Skills</Label>
                <Input
                  placeholder="Running, Cycling"
                  value={form.specialSkill}
                  onChange={(e) => handleChange("specialSkill", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Interested Areas</Label>
                <Input
                  placeholder="Running, Volunteering"
                  value={form.interested}
                  onChange={(e) => handleChange("interested", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <Label className="mb-0">Is Event Staff</Label>
              <Switch
                checked={form.isEventStaff}
                onCheckedChange={(val) => handleChange("isEventStaff", val)}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <Label className="mb-0">Wants to Join Team</Label>
              <Switch
                checked={form.wantsToJoinTeam}
                onCheckedChange={(val) => handleChange("wantsToJoinTeam", val)}
              />
            </div>
          </div>

          {/* Role & Approval */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Member Type</Label>
              <Select value={form.memberType} onValueChange={(v) => handleChange("memberType", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="advisor">Advisor</SelectItem>
                  <SelectItem value="core_team">Core Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Admin Approval</Label>
              <Select value={form.adminApproval} onValueChange={(v) => handleChange("adminApproval", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Text Areas */}
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Why Join</Label>
              <Textarea
                rows={3}
                placeholder="Reason for joining..."
                value={form.whyJoin}
                onChange={(e) => handleChange("whyJoin", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Join Team Reason</Label>
              <Textarea
                rows={3}
                placeholder="Reason for joining team..."
                value={form.joinTeamReason}
                onChange={(e) => handleChange("joinTeamReason", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Recommendation Message</Label>
              <Textarea
                rows={2}
                placeholder="Any recommendations..."
                value={form.recommendationMessage}
                onChange={(e) => handleChange("recommendationMessage", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t mt-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Updating...
              </>
            ) : (
              "Update Member"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
