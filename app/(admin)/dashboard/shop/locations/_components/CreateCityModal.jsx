"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { createCity } from "@/services/admin/admin.checkout-location.service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CreateCityModal({ open, setOpen, districtId, onRefresh }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.warning("Please enter a city name");
      return;
    }
    try {
      setLoading(true);
      await createCity({ name: name.trim(), districtId: Number(districtId) });
      toast.success("City created!");
      setName("");
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setName(""); }}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Add City</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>City Name</Label>
            <Input placeholder="e.g. Dhaka North" value={name} onChange={(e) => setName(e.target.value)} />
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
