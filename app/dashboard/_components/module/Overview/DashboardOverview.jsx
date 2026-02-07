import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  Eye,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import { StatCard } from "../../StatCard";

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

export default function DashboardOverview() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with Run Rise Nation.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Events"
          value="100+"
          change="+12 this year"
          changeType="positive"
          icon={<Calendar/>}
          iconColor="primary"
        />
        <StatCard
          title="Active Members"
          value="960+"
          change="+48 this month"
          changeType="positive"
          icon={<Users/>}
          iconColor="accent"
        />
        <StatCard
          title="Blog Posts"
          value="45"
          change="+3 this week"
          changeType="positive"
          icon={<FileText/>}
          iconColor="success"
        />
        <StatCard
          title="Total Registrations"
          value="2,450"
          change="+18% vs last month"
          changeType="positive"
          icon={<TrendingUp/>}
          iconColor="warning"
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Events */}
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

        {/* Recent Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display text-lg">Recent Blog Posts</CardTitle>
              <CardDescription>Latest articles and stories</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              View All
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-card-foreground">
                      {post.title}
                    </span>
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-medium">{post.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="gap-2">
              <Calendar className="h-4 w-4" />
              Create Event
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Write Blog Post
            </Button>
            <Button variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              Add Team Member
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
