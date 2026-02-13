import { CollapsibleContent } from "@/app/components/ui/collapsible";
import { Badge, Package } from "lucide-react";

export default function DashboardPackageContent({ event }) {
  return (
    <CollapsibleContent className="mt-4">
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Package className="h-4 w-4 text-primary" />
          Registration Packages
        </h4>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {event.packages.map((pkg) => (
            <div
              key={pkg.id}
              className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-bold text-lg text-primary">
                  {pkg.distance}
                </span>
                <Badge variant="outline" className="font-semibold">
                  BDT {pkg.price}
                </Badge>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Registered</span>
                  <span className="font-medium text-foreground">
                    {pkg.registered}/{pkg.slots}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${(pkg.registered / pkg.slots) * 100}%`,
                    }}
                  />
                </div>
                <div className="text-xs text-muted-foreground text-right">
                  {pkg.slots - pkg.registered} slots left
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CollapsibleContent>
  );
}
