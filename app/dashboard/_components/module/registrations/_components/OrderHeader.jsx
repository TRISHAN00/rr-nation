import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function OrderHeader({handleExportCSV}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
        <p className="text-muted-foreground text-sm">
          Real-time aggregate totals across all pages.
        </p>
      </div>
      <Button
        onClick={handleExportCSV}
        variant="outline"
        className="w-fit gap-2 border-primary/20 hover:bg-primary/5"
      >
        <Download className="h-4 w-4" /> Export Current View
      </Button>
    </div>
  );
}
