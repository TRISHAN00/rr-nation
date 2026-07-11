import { Card, CardContent } from "@/app/components/ui/card";
import {
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Tag,
  TrendingUp,
  Wallet,
} from "lucide-react";

function StatCard({ icon: Icon, label, value, tone = "neutral" }) {
  const tones = {
    neutral: "bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    green: "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
  };

  return (
    <Card className="border-border/60 shadow-none">
      <CardContent className="p-3 flex items-center gap-3">
        <div className={`shrink-0 rounded-lg p-2 ${tones[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground truncate">
            {label}
          </p>
          <p className="text-lg font-semibold tabular-nums leading-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MemberStatsSummary({ summary }) {
  const s = summary || {};

  if (!(s.totalEvents > 0)) return null;

  return (
    <div className="space-y-3 my-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        <StatCard icon={Activity} label="Total" value={s.totalEvents} tone="neutral" />
        <StatCard icon={CheckCircle2} label="Done" value={s.completed} tone="green" />
        <StatCard icon={Clock} label="Pending" value={s.pending} tone="amber" />
        <StatCard icon={TrendingUp} label="Rate" value={`${s.completionRate}%`} tone="emerald" />
        <StatCard icon={Calendar} label="Upcoming" value={s.upcoming} tone="neutral" />
        <StatCard icon={MapPin} label="Past" value={s.past} tone="neutral" />
        <StatCard
          icon={DollarSign}
          label="Fee"
          value={`৳${(s.totalRegistrationFee || 0).toLocaleString()}`}
          tone="neutral"
        />
        <StatCard
          icon={Wallet}
          label="Live / Virtual"
          value={`${s.byEventType?.live || 0} / ${s.byEventType?.virtual || 0}`}
          tone="neutral"
        />
      </div>

      {(s.byRunningCategory || s.byYear) && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
          {s.byRunningCategory && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground mr-1">
                Category
              </span>
              {Object.entries(s.byRunningCategory).map(([cat, count]) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-background border border-border/60 text-xs font-medium"
                >
                  <Tag className="h-3 w-3 text-muted-foreground" />
                  {cat} <span className="text-muted-foreground">({count})</span>
                </span>
              ))}
            </div>
          )}
          {s.byYear && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground mr-1">
                Year
              </span>
              {Object.entries(s.byYear).map(([year, count]) => (
                <span
                  key={year}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-background border border-border/60 text-xs font-medium"
                >
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  {year} <span className="text-muted-foreground">({count})</span>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}