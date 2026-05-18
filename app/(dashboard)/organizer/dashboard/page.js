import { StatCard } from "@/app/(admin)/dashboard/_components/StatCard";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  ArrowUpRight,
  Calendar,
  ClipboardList,
  Clock,
  DollarSign,
  Users
} from "lucide-react";
import HeaderPageOrg from "../_components/HeaderPageOrg";

const recentEvents = [
  {
    id: 1,
    title: "Accounting Day Run 2025",
    date: "Nov 7, 2025",
    status: "upcoming",
    registrations: 284,
  },
  {
    id: 2,
    title: "5K Fun Run",
    date: "Dec 15, 2025",
    status: "upcoming",
    registrations: 156,
  },
  {
    id: 3,
    title: "Half Marathon 2024",
    date: "Oct 20, 2024",
    status: "completed",
    registrations: 520,
  },
];

const recentPosts = [
  {
    id: 1,
    title: "Training Tips for Beginners",
    views: 1240,
    date: "2 days ago",
  },
  {
    id: 2,
    title: "Nutrition for Marathon Runners",
    views: 890,
    date: "5 days ago",
  },
  {
    id: 3,
    title: "Recovery Techniques",
    views: 650,
    date: "1 week ago",
  },
];

export default function OrganizerDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <HeaderPageOrg title={`Organizer Dashboard`} desc={`Manage your events, participants, registrations, and event activities.`} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Events"
          value="12"
          change="+3 this month"
          changeType="positive"
          icon={<Calendar className="h-5 w-5" />}
        />

        <StatCard
          title="Total Participants"
          value="1,248"
          change="+18% from last event"
          changeType="positive"
          icon={<Users className="h-5 w-5" />}
        />

        <StatCard
          title="Active Registrations"
          value="324"
          change="Currently open"
          changeType="neutral"
          icon={<ClipboardList className="h-5 w-5" />}
        />

        <StatCard
          title="Revenue Generated"
          value="$8,540"
          change="+22% this season"
          changeType="positive"
          icon={<DollarSign className="h-5 w-5" />}
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-display text-lg">Recent Events</CardTitle>
            <CardDescription>Manage your upcoming and past events</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            View All
            <ArrowUpRight className="h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-card-foreground">
                    {event.title}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {event.date}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-sm font-medium text-card-foreground">
                      {event.registrations}
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      registrations
                    </span>
                  </div>
                  <Badge
                    variant={event.status === "upcoming" ? "default" : "secondary"}
                    className={
                      event.status === "upcoming"
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }
                  >
                    {event.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

  )
}
