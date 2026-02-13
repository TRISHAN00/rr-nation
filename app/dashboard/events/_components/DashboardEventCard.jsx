"use client";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit,
  Eye,
  MapPin,
  MoreHorizontal,
  Package,
  Shirt,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function DashboardEventCard({ event, typeConfig, TypeIcon }) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="h-1.5 bg-gradient-to-r from-primary to-primary/70" />
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={typeConfig.className}>
                  <TypeIcon className="h-3 w-3 mr-1" />
                  {typeConfig.label}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Package className="h-3 w-3" />
                  {event.packages.length} packages
                </Badge>
                {event.tshirtSettings?.enabled && (
                  <Badge
                    variant="outline"
                    className={`gap-1 ${event.tshirtSettings.required ? "bg-primary/10 text-primary border-primary/20" : ""}`}
                  >
                    <Shirt className="h-3 w-3" />
                    T-Shirt{" "}
                    {event.tshirtSettings.required
                      ? "(Required)"
                      : "(Optional)"}
                  </Badge>
                )}
              </div>
              <CardTitle className="font-display text-xl">
                {event.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {event.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  {expandedEvent === event.id ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Hide Packages
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      View Packages
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {event.time}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {event.venue}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              {event.organizer}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Users className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">
                {event.totalRegistrations}
              </span>
              <span className="text-muted-foreground">registrations</span>
            </div>
          </div>

          {/* Packages Section */}
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
        </CardContent>
      </Card>
    </Collapsible>
  );
}
