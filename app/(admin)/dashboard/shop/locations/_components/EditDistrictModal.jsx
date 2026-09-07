"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { updateDistrict } from "@/services/admin/admin.checkout-location.service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditDistrictModal({ open, setOpen, district, divisions, onRefresh }) {
  const [form, setForm] = useState({ name: "", divisionId: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (district && open) {
      setForm({
        name: district.name || "",
        divisionId: String(district.division?.id || ""),
      });
    }
  }, [district, open]);

  const handleSubmit = async () => {
    if (!district) return;
    try {
      setLoading(true);
      await updateDistrict(district.id, {
        name: form.name.trim(),
        divisionId: Number(form.divisionId),
      });
      toast.success("District updated!");
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
        <DialogHeader><DialogTitle>Edit District</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Division</Label>
            <Select value={form.divisionId} onValueChange={(v) => setForm({ ...form, divisionId: v })}>
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
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
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
