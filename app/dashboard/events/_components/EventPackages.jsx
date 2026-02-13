import { Badge } from "@/app/components/ui/badge";
import { Package } from "lucide-react";

export default function EventPackages({ packages }) {
  return (
    <div className="border-t border-border pt-4 mt-4">
      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <Package className="h-4 w-4 text-primary" />
        Registration Packages
      </h4>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="p-4 rounded-lg border bg-card"
          >
            <div className="flex justify-between mb-2">
              <span className="font-bold text-primary">{pkg.distance}</span>
              <Badge variant="outline">BDT {pkg.price}</Badge>
            </div>

            <div className="text-sm space-y-1">
              <div className="flex justify-between text-muted-foreground">
                <span>Registered</span>
                <span className="font-medium">
                  {pkg.registered}/{pkg.slots}
                </span>
              </div>

              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
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
  );
}
