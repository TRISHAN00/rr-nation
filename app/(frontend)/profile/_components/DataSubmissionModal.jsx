"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { submitVirtualEventData } from "@/services/user.service";
import { Link as LinkIcon, Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DataSubmissionModal({ open, onClose, onSuccess, orderItem }) {
  const existingSubmissions = orderItem?.bib?.submissionLinks || [];
  const [submissionLinks, setSubmissionLinks] = useState(
    existingSubmissions.length > 0
      ? existingSubmissions.map((s) => ({ title: s.title || "", link: s.link || "" }))
      : [{ title: "", link: "" }]
  );
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...submissionLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSubmissionLinks(updated);
  };

  const addRow = () => {
    setSubmissionLinks([...submissionLinks, { title: "", link: "" }]);
  };

  const removeRow = (index) => {
    if (submissionLinks.length === 1) return;
    setSubmissionLinks(submissionLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const valid = submissionLinks.filter((s) => s.title.trim() && s.link.trim());
    if (valid.length === 0) {
      toast.error("Add at least one submission link");
      return;
    }
    const existing = orderItem?.bib?.submissionLinks?.map((s) => ({ title: s.title, link: s.link })) || [];
    const allLinks = [...existing, ...valid];
    setSubmitting(true);
    try {
      await submitVirtualEventData({
        orderItemId: orderItem.id,
        submissionLinks: allLinks,
      });
      toast.success("Data submitted successfully");
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-lg w-[calc(100%-2rem)] sm:w-full">
        <DialogHeader>
          <DialogTitle>Submit Event Data</DialogTitle>
          <DialogDescription>
            Add links to your submitted documents or media for{" "}
            <span className="font-semibold text-foreground">
              {orderItem?.eventTicket?.event?.name || "this event"}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-[50vh] sm:max-h-80 overflow-y-auto pr-1">
          {submissionLinks.map((entry, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="flex-1 space-y-2 min-w-0">
                <Input
                  placeholder="Title (e.g. PDF, Certificate)"
                  value={entry.title}
                  onChange={(e) => handleChange(idx, "title", e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input
                    placeholder="https://example.com/file.pdf"
                    value={entry.link}
                    onChange={(e) => handleChange(idx, "link", e.target.value)}
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="mt-1 shrink-0"
                onClick={() => removeRow(idx)}
                disabled={submissionLinks.length === 1}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        <Button variant="outline" size="sm" onClick={addRow} className="w-full">
          <Plus className="h-4 w-4 mr-1" /> Add Another Link
        </Button>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose} disabled={submitting} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting} className="w-full sm:w-auto">
            {submitting && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
