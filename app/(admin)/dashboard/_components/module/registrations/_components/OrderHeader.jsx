import { Button } from "@/components/ui/button";
import { Download, FileImage } from "lucide-react";

export default function OrderHeader({
  handleExportCSV,
  handleExportSVG,
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
      <div className="flex items-center gap-2">
        <Button
          onClick={handleExportSVG}
          variant="outline"
          className="w-fit gap-2 border-primary/20 hover:bg-primary/5"
        >
          <FileImage className="h-4 w-4" /> Export SVG
        </Button>
        <Button
          onClick={handleExportCSV}
          variant="outline"
          className="w-fit gap-2 border-primary/20 hover:bg-primary/5"
        >
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>
    </div>
  );
}
