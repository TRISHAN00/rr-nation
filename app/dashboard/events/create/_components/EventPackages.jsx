"use client";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function EventPackages() {
  const [newPackages, setNewPackages] = useState([
    { distance: "", price: "", slots: "" },
  ]);

  const addPackage = () => {
    setNewPackages([...newPackages, { distance: "", price: "", slots: "" }]);
  };
  P;

  return (
    <div className="border-t border-border pt-4 mt-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Label className="text-base font-semibold">
            Registration Packages
          </Label>
          <p className="text-sm text-muted-foreground">
            Add different distance packages with pricing
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addPackage}>
          <Plus className="h-4 w-4 mr-1" />
          Add Package
        </Button>
      </div>

      <div className="space-y-3">
        {newPackages.map((pkg, index) => (
          <div
            key={index}
            className="flex gap-3 items-end p-3 bg-muted/50 rounded-lg"
          >
            <div className="flex-1 grid gap-2">
              <Label className="text-xs">Distance</Label>
              <Input
                placeholder="e.g., 5km"
                value={pkg.distance}
                onChange={(e) =>
                  updatePackage(index, "distance", e.target.value)
                }
              />
            </div>
            <div className="flex-1 grid gap-2">
              <Label className="text-xs">Price (BDT)</Label>
              <Input
                type="number"
                placeholder="e.g., 500"
                value={pkg.price}
                onChange={(e) => updatePackage(index, "price", e.target.value)}
              />
            </div>
            <div className="flex-1 grid gap-2">
              <Label className="text-xs">Available Slots</Label>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={pkg.slots}
                onChange={(e) => updatePackage(index, "slots", e.target.value)}
              />
            </div>
            {newPackages.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-destructive shrink-0"
                onClick={() => removePackage(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
