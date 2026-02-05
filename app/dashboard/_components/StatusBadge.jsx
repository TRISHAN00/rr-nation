import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function StatusBadge({ status, type }) {
  const getVariant = () => {
    if (type === "registration") {
      switch (status) {
        case "Confirmed":
          return "bg-success/10 text-success border-success/20 hover:bg-success/20";
        case "Pending":
          return "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20";
        case "Cancelled":
          return "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20";
        default:
          return "";
      }
    } else {
      switch (status) {
        case "Paid":
          return "bg-success/10 text-success border-success/20 hover:bg-success/20";
        case "Unpaid":
          return "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20";
        default:
          return "";
      }
    }
  };

  return (
    <Badge variant="outline" className={cn("font-medium", getVariant())}>
      {status}
    </Badge>
  );
}
