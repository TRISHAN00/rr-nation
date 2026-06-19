"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { updateVirtualEventSubmission } from "@/services/admin/admin.bib.service";
import { CreditCard, ExternalLink, Hash, Loader2, Save, Ticket, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import BIBInput from "./BIBInput";
import OrderDataField from "./OrderDataField";

export default function OrderSheet({ selectedReg, onBibUpdate }) {
  const [editingBib, setEditingBib] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const startEdit = (bib, orderItemId) => {
    setEditForm({
      orderItemId,
      adminApproval: bib.adminApproval || "pending",
      tracking: bib.tracking || "",
      certificateDownloadLink: bib.certificateDownloadLink || "",
    });
    setEditingBib(orderItemId);
  };

  const handleSave = async () => {
    if (!editForm.orderItemId) return;
    setSaving(true);
    try {
      await updateVirtualEventSubmission(editForm);
      toast.success("BIB submission updated successfully");
      onBibUpdate?.(editForm.orderItemId, {
        adminApproval: editForm.adminApproval,
        tracking: editForm.tracking,
        certificateDownloadLink: editForm.certificateDownloadLink,
      });
      setEditingBib(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Section 1: Buyer Information (The Account Holder) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <User className="h-4 w-4" />
          <h4 className="text-xs font-bold uppercase tracking-widest">
            User Information
          </h4>
        </div>
        <div className="grid gap-3 p-4 rounded-xl border border-border bg-muted/30">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-muted-foreground font-bold">
              Account Name
            </span>
            <span className="text-sm font-semibold">
              {selectedReg?.user?.firstName} {selectedReg?.user?.lastName}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">
                Email
              </span>
              <span className="text-sm truncate">
                {selectedReg?.user?.email || "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">
                Phone
              </span>
              <span className="text-sm">
                {selectedReg?.user?.phone || "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">
                Address
              </span>
              <span className="text-sm">
                {selectedReg?.user?.address || "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">
                Gender
              </span>
              <span className="text-sm">
                {selectedReg?.user?.gender || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Participants (The Core Data) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Ticket className="h-4 w-4" />
          <h4 className="text-xs font-bold uppercase tracking-widest">
            Participants ({selectedReg?.order?.items?.length})
          </h4>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {selectedReg?.order?.items.map((item, idx) => {

            return (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border border-border rounded-xl px-4 bg-background shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 text-left">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {item?.eventTicket?.name?.charAt(0) || "E"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">
                        {item?.eventTicket?.event?.name || ""}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-medium">
                        {item?.eventTicket?.name|| ""}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="border-t border-border/50 pt-4 pb-4">
                  {/* BIB Input component */}
                  <BIBInput item={item} />

                  {/* Bib Details */}
                  {item?.bib && (
                    <div className="mb-4 p-4 rounded-lg border border-border bg-muted/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="text-[11px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                          <Hash className="h-3.5 w-3.5" />
                          BIB Details
                        </h5>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-[9px] h-5 px-2 font-bold uppercase ${
                            item.bib.adminApproval === "approved" ? "bg-emerald-500" :
                            item.bib.adminApproval === "pending" ? "bg-amber-500" :
                            "bg-red-500"
                          }`}>
                            {item.bib.adminApproval}
                          </Badge>
                          {editingBib !== item.id && (
                            <button
                              type="button"
                              onClick={() => startEdit(item.bib, item.id)}
                              className="text-[10px] font-semibold text-primary hover:underline"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      </div>

                      {editingBib === item.id ? (
                        <div className="space-y-3">
                          <div className="flex flex-col">
                            <span className="text-[9px] uppercase text-muted-foreground font-black tracking-tighter mb-1">Admin Approval</span>
                            <Select
                              value={editForm.adminApproval}
                              onValueChange={(v) => setEditForm({ ...editForm, adminApproval: v })}
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] uppercase text-muted-foreground font-black tracking-tighter mb-1">Tracking</span>
                            <Input
                              className="h-8 text-xs"
                              placeholder="e.g. Medal Ready to Deliver"
                              value={editForm.tracking}
                              onChange={(e) => setEditForm({ ...editForm, tracking: e.target.value })}
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] uppercase text-muted-foreground font-black tracking-tighter mb-1">Certificate Download Link</span>
                            <Input
                              className="h-8 text-xs"
                              placeholder="https://example.com/certificate.pdf"
                              value={editForm.certificateDownloadLink}
                              onChange={(e) => setEditForm({ ...editForm, certificateDownloadLink: e.target.value })}
                            />
                          </div>
                          <div className="flex items-center gap-2 pt-1">
                            <Button size="sm" className="h-8 text-xs" onClick={handleSave} disabled={saving}>
                              {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                              {saving ? "Saving..." : "Save"}
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => setEditingBib(null)} disabled={saving}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          <div className="flex flex-col">
                            <span className="text-[9px] uppercase text-muted-foreground font-black tracking-tighter">BIB Number</span>
                            <span className="text-sm font-bold text-foreground mt-0.5">{item.bib.bibNumber}</span>
                          </div>

                          {item.bib.bibAttachment && (
                            <div className="flex flex-col">
                              <span className="text-[9px] uppercase text-muted-foreground font-black tracking-tighter">BIB Attachment</span>
                              <div className="group relative w-fit mt-1 rounded-md overflow-hidden border bg-background shadow-sm">
                                <img
                                  src={item.bib.bibAttachment}
                                  alt="BIB"
                                  className="h-12 w-20 object-cover transition-transform duration-200 group-hover:scale-110 cursor-pointer"
                                  onClick={() => window.open(item.bib.bibAttachment, "_blank")}
                                />
                              </div>
                            </div>
                          )}

                          {item.bib.tracking && (
                            <div className="flex flex-col">
                              <span className="text-[9px] uppercase text-muted-foreground font-black tracking-tighter">Tracking</span>
                              <span className="text-xs font-semibold text-foreground mt-0.5">{item.bib.tracking}</span>
                            </div>
                          )}

                          {item.bib.certificateDownloadLink && (
                            <div className="flex flex-col">
                              <span className="text-[9px] uppercase text-muted-foreground font-black tracking-tighter">Certificate</span>
                              <button
                                type="button"
                                onClick={() => window.open(item.bib.certificateDownloadLink, "_blank")}
                                className="flex items-center gap-1.5 h-6 px-2 text-[10px] font-medium border rounded-md bg-background hover:bg-accent transition-all w-fit mt-1"
                              >
                                <ExternalLink className="h-3 w-3" />
                                Download
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {item.bib.submissionLinks?.length > 0 && (
                        <div className="flex flex-col pt-2 border-t border-border/50">
                          <span className="text-[9px] uppercase text-muted-foreground font-black tracking-tighter mb-2">Submission Links</span>
                          <div className="space-y-1.5">
                            {item.bib.submissionLinks.map((link, li) => (
                              <a
                                key={li}
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs text-primary hover:underline bg-background px-2.5 py-1.5 rounded border border-border/50"
                              >
                                <ExternalLink className="h-3 w-3 shrink-0" />
                                <span className="font-medium">{link.title}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">

                    {/* 1. MAPPING FROM formData ARRAY (If it exists) */}
                    {item?.formData?.map((field, index) => (
                      <OrderDataField
                        key={`form-field-${idx}-${index}`}
                        label={field.label}
                        value={field.value}
                        highlight={field.name.includes("option") || field.name.includes("confirm")}
                      />
                    ))}

                    {/* 2. MAPPING FROM participant OBJECT (If formData is null/empty) */}
                    {(!item?.formData || item.formData.length === 0) && item?.participant && (
                      <>
                        {item.participant.name && <OrderDataField label="Name" value={item.participant.name} />}
                        {item.participant.email && <OrderDataField label="Email" value={item.participant.email} />}
                        {item.participant.contactNumber && <OrderDataField label="Phone" value={item.participant.contactNumber} />}
                        {item.participant.gender && <OrderDataField label="Gender" value={item.participant.gender} />}
                        {item.participant.bloodGroup && (
                          <OrderDataField label="Blood Group" value={item.participant.bloodGroup} color="text-destructive" />
                        )}
                        {item.participant.tshirtSize && <OrderDataField label="T-Shirt" value={item.participant.tshirtSize} />}
                        {item.participant.ageCategory && <OrderDataField label="Age Category" value={item.participant.ageCategory} />}
                        {item.participant.runnerCategory && <OrderDataField label="Runner Cat." value={item.participant.runnerCategory} />}
                      </>
                    )}

                    {/* 3. TICKET-LEVEL METRICS (Fallback/Static) */}
                    {item.eventTicket?.distance && (
                      <OrderDataField label="Distance" value={item.eventTicket.distance} />
                    )}

                    {/* 4. CONDITIONAL CYCLE METRICS */}
                    {(item.participant?.cycleBrandName || item.participant?.cycleFrameSize) && (
                      <div className="col-span-2 grid grid-cols-2 gap-4 bg-muted/30 p-2 rounded mt-1">
                        {item.participant?.cycleBrandName && (
                          <OrderDataField label="Cycle Brand" value={item.participant.cycleBrandName} />
                        )}
                        {item.participant?.cycleFrameSize && (
                          <OrderDataField label="Frame Size" value={item.participant.cycleFrameSize} />
                        )}
                      </div>
                    )}

                    {/* 5. EMERGENCY CONTACT BLOCK (Prioritizing participant object data) */}
                    {(item.participant?.emergencyContactName || item.eventTicket?.emergencyContactName) && (
                      <div className="col-span-2 grid grid-cols-2 gap-4 bg-amber-50/70 p-3 rounded-lg border border-amber-100/50 mt-2">
                        <div>
                          <p className="text-[9px] font-bold text-amber-700 uppercase tracking-tighter">
                            Emergency: {item.participant?.emergencyContactName || item.eventTicket?.emergencyContactName || "Guardian"}
                          </p>
                          <p className="text-xs font-bold text-amber-900">
                            {item.participant?.emergencyContactNumber || item.eventTicket?.emergencyContactNumber || "Not Provided"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-bold text-amber-700 uppercase tracking-tighter">
                            Past Events
                          </p>
                          <p className="text-xs font-bold text-amber-900">
                            {item.participant?.participatedEventNumbers ?? item.eventTicket?.participatedEventNumbers ?? "0"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>

      {/* Section 3: Payment & Transaction */}
      <section className="pt-6 border-t border-border">
        <div className="flex items-center gap-2 text-primary mb-4">
          <CreditCard className="h-4 w-4" />
          <h4 className="text-xs font-bold uppercase tracking-widest">
            Payment Summary
          </h4>
        </div>

        <div className="space-y-3 bg-muted/20 p-4 rounded-xl border border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Gateway</span>
            <span className="font-bold uppercase">
              {selectedReg?.paymentGateway}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">
              {new Date(selectedReg?.paymentDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">
              Transaction ID
            </span>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-background p-2 rounded border border-border text-[10px] font-mono truncate">
                {selectedReg?.transactionId}
              </code>
            </div>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-border/50">
            <span className="text-base font-bold">Total Paid</span>
            <span className="text-2xl font-black text-primary">
              ৳{Math.ceil(selectedReg?.afterDiscountAmount).toLocaleString()}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
