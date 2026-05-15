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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { useEffect, useState } from "react";

export default function AddTshirtSizeForm({ modalOpen, setModalOpen, eventId, onSizesSubmit }) {
  const [sizes, setSizes] = useState({
    eventId,
    category: "",
    sizeName: "",
    chest: "",
    length: "",
  });

  useEffect(() => {
    setSizes((prev) => ({ ...prev, eventId }));
  }, [eventId]);

  const handleChange = (name, value) => {
    setSizes((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSizesSubmit({ ...sizes });
    setSizes({ eventId, category: "", sizeName: "", chest: "", length: "" });
    setModalOpen(false);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add T-Shirt Size</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={sizes.category}
                onValueChange={(val) => handleChange("category", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adult">Adult</SelectItem>
                  <SelectItem value="kids">Kids</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sizeName">Size Name</Label>
              <Input
                id="sizeName"
                name="sizeName"
                value={sizes.sizeName}
                onChange={(e) => handleChange("sizeName", e.target.value)}
                placeholder="S / M / L / XL"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="chest">Chest (cm)</Label>
              <Input
                id="chest"
                name="chest"
                type="number"
                value={sizes.chest}
                onChange={(e) => handleChange("chest", e.target.value)}
                placeholder="Enter chest measurement"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="length">Length (cm)</Label>
              <Input
                id="length"
                name="length"
                type="number"
                value={sizes.length}
                onChange={(e) => handleChange("length", e.target.value)}
                placeholder="Enter length measurement"
                required
              />
            </div>

            <DialogFooter className="pt-4">
              <Button type="submit" className="w-full">
                Add Size
              </Button>
            </DialogFooter>

          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
