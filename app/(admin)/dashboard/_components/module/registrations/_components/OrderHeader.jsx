import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function OrderHeader({
  handleExportCSV,
  title = "",
  desc = "",
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        {title && (
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        )}
        {desc && <p className="text-muted-foreground text-sm">{desc}</p>}
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
