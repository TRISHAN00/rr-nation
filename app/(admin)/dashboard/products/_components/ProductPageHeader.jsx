"use client";

import { Button } from "@/app/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateProductModal from "./CreateProductModal";

export default function ProductPageHeader({ onRefresh }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Products</h2>

      <div className="flex items-center gap-2">
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-1.5" /> Create Product
        </Button>
      </div>

      <CreateProductModal open={open} setOpen={setOpen} onRefresh={onRefresh} />
    </div>
  );
}
