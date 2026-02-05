import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";

import { mockEvents, mockStats } from "@/app/dashboard/data/mockData";
import { format, isAfter, parseISO } from "date-fns";
import { Calendar, CheckCircle, ClipboardList, CreditCard } from "lucide-react";
import { StatCard } from "../../StatCard";
import { StatusBadge } from "../../StatusBadge";

export default function Overview() {
  const upcomingEvents = mockEvents
    .filter((e) => isAfter(parseISO(e.date), new Date()))
    .slice(0, 3);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back!
        </h2>
        <p className="text-muted-foreground">
          Here's an overview of your event registrations.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Events"
          value={mockStats.totalEventsRegistered}
          icon={ClipboardList}
          description="All time registrations"
        />
        <StatCard
          title="Upcoming Events"
          value={mockStats.upcomingEvents}
          icon={Calendar}
          description="Events scheduled"
        />
        <StatCard
          title="Completed Events"
          value={mockStats.completedEvents}
          icon={CheckCircle}
          description="Events attended"
        />
        <StatCard
          title="Total Payments"
          value={`$${mockStats.totalPayments.toFixed(2)}`}
          icon={CreditCard}
          description="All time spending"
        />
      </div>

      {/* Upcoming Events Preview */}
      <Card className="stat-card-shadow">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your next scheduled events</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col gap-2 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{event.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(parseISO(event.date), "MMM d, yyyy")} at {event.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge
                      status={event.registrationStatus}
                      type="registration"
                    />
                    <StatusBadge status={event.paymentStatus} type="payment" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No upcoming events scheduled.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
