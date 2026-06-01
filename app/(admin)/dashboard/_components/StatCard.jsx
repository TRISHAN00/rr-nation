import { Card, CardContent } from "@/app/components/ui/card";

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
}) {
  return (
    <Card className="stat-card-shadow transition-shadow hover:stat-card-shadow-hover">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <p className="text-3xl font-bold tracking-tight text-foreground">
              {value ? value : 0}
            </p>

            {change && (
              <p
                className={`text-xs ${
                  changeType === "positive"
                    ? "text-green-600"
                    : changeType === "negative"
                    ? "text-red-600"
                    : "text-muted-foreground"
                }`}
              >
                {change}
              </p>
            )}
          </div>

          <div className="rounded-lg bg-accent p-2.5">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}