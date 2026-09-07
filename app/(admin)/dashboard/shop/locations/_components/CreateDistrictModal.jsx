"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { createDistrict } from "@/services/admin/admin.checkout-location.service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CreateDistrictModal({ open, setOpen, divisionId, divisions, onRefresh }) {
  const [form, setForm] = useState({ name: "", divisionId: "" });
  const [loading, setLoading] = useState(false);

  const resetForm = () => setForm({ name: "", divisionId: "" });

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.warning("Please enter a district name");
      return;
    }
    try {
      setLoading(true);
      await createDistrict({ name: form.name.trim(), divisionId: Number(divisionId) });
      toast.success("District created!");
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
        <DialogHeader><DialogTitle>Add District</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Division</Label>
            <Select value={String(divisionId)} disabled>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {divisions.map((d) => (
                  <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>District Name</Label>
            <Input placeholder="e.g. Gazipur" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
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
