import { Calendar } from "lucide-react";

export default function DashboardEventFooter() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
      <h3 className="font-display text-lg font-medium">No events found</h3>
      <p className="text-muted-foreground">
        Try adjusting your search or filters
      </p>
    </div>
  );
}
