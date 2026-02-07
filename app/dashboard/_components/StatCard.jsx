import { Card, CardContent } from "@/app/components/ui/card";

export function StatCard({ title, value, description, icon }) {
  return (
    <Card className="stat-card-shadow transition-shadow hover:stat-card-shadow-hover">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight text-foreground">
              {value}
            </p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="rounded-lg bg-accent p-2.5">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
