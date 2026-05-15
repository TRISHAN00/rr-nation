import { Badge } from "@/app/components/ui/badge";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function OrderSheetHeader({ selectedReg }) {
  return (
    <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border p-6">
      <SheetHeader>
        <div className="flex justify-between items-start">
          <div>
            <SheetTitle className="text-2xl font-black tracking-tight">
              Registration Detail
            </SheetTitle>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              ID: #NR{selectedReg?.id}
            </p>
          </div>
          <Badge
            className={`${selectedReg?.status === "completed" ? "bg-emerald-500" : "bg-amber-500"}`}
          >
            {selectedReg?.status?.toUpperCase()}
          </Badge>
        </div>
      </SheetHeader>
    </div>
  );
}
