import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function EvRegPageHeader() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Event Registration Fields</h2>

      <Button className={` flex gap-x-1`} onClick={() => setOpen(true)}>
        <Plus />
        Add Field
      </Button>
    </div>
  )
}
