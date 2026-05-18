import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
    ArrowUpRight,
    Clock,
    Eye
} from "lucide-react";

export default function LastestEvents() {
  return (
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
  )
}
