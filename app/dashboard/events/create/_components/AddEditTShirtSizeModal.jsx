"use client";

import { Button } from "@/app/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useState } from "react";

export default function AddEditTShirtSizeModal({
  open,
  setOpen,
  category,
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: "",
    chest: "",
    length: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(category, {
      id: Date.now(),
      ...form,
    });

    setForm({ name: "", chest: "", length: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Size</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label>Size Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="M / L / XL"
              required
            />
          </div>

          <div>
            <Label>Chest (inches)</Label>
            <Input
              type="number"
              value={form.chest}
              onChange={(e) => setForm({ ...form, chest: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Length (inches)</Label>
            <Input
              type="number"
              value={form.length}
              onChange={(e) => setForm({ ...form, length: e.target.value })}
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit">Add Size</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
