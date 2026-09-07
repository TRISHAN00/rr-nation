"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { createDivision } from "@/services/admin/admin.checkout-location.service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CreateDivisionModal({ open, setOpen, onRefresh }) {
  const [form, setForm] = useState({ name: "", code: "" });
  const [loading, setLoading] = useState(false);

  const resetForm = () => setForm({ name: "", code: "" });

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.code.trim()) {
      toast.warning("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      await createDivision({ name: form.name.trim(), code: form.code.trim().toUpperCase() });
      toast.success("Division created!");
      resetForm();
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Add Division</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input placeholder="e.g. Dhaka" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Code</Label>
            <Input placeholder="e.g. DHAKA" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t mt-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Creating...</> : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
