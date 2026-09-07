"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { updateCity } from "@/services/admin/admin.checkout-location.service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditCityModal({ open, setOpen, city, onRefresh }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city && open) {
      setName(city.name || "");
    }
  }, [city, open]);

  const handleSubmit = async () => {
    if (!city) return;
    try {
      setLoading(true);
      await updateCity(city.id, { name: name.trim() });
      toast.success("City updated!");
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
        <DialogHeader><DialogTitle>Edit City</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>City Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
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
