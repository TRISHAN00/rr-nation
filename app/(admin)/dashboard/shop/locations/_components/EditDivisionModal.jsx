"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { updateDivision } from "@/services/admin/admin.checkout-location.service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditDivisionModal({ open, setOpen, division, onRefresh }) {
  const [form, setForm] = useState({ name: "", code: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (division && open) {
      setForm({ name: division.name || "", code: division.code || "" });
    }
  }, [division, open]);

  const handleSubmit = async () => {
    if (!division) return;
    try {
      setLoading(true);
      await updateDivision(division.id, { name: form.name.trim(), code: form.code.trim().toUpperCase() });
      toast.success("Division updated!");
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Edit Division</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Code</Label>
            <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t mt-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Updating...</> : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
