const { Card, CardContent } = require("@/app/components/ui/card");

function StatCard({ icon, label, value, subText, color }) {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                {subText}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
