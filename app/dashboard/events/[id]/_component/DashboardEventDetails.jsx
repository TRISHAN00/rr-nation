"use client";

import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import DashboardPackageCard from "../../_components/DashboardPackageCard";

export default function DashboardEventDetails({ event }) {
  console.log(event);
  return (
    <Card>
      {/* Header */}
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl">{event?.name}</CardTitle>

            <CardDescription className="mt-1">
              Organized by{" "}
              <span className="font-medium">{event?.organizerName}</span>
            </CardDescription>
          </div>

          {event && (
            <Badge
              variant={event.status === "active" ? "default" : "secondary"}
            >
              {event.status.toUpperCase()}
            </Badge>
          )}
        </div>
      </CardHeader>

      <Separator />

      {/* Content */}
      <CardContent className="space-y-5 pt-6">
        {/* Meta Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {event?.date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event?.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event?.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="capitalize">{event?.eventType} event</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-semibold mb-1">Description</h4>
          <p className="text-sm text-muted-foreground">
            {event?.description || "No description provided."}
          </p>
        </div>

        {/* Status Flags */}
        {/* <div className="flex flex-wrap gap-2">
          {event?.isActive && <Badge variant="outline">Active</Badge>}
          {event?.isArchived && <Badge variant="destructive">Archived</Badge>}
        </div> */}

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageBox label="Banner Image" image={event?.bannerImage} />
          <ImageBox label="Thumbnail Image" image={event?.thumbImage} />
        </div>
      </CardContent>

      {/* Packages Section */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {event?.packages?.map((pkg) => (
          <DashboardPackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </Card>
  );
}

/* Reusable Image Box */
function ImageBox({ label, image }) {
  return (
    <div>
      <p className="text-sm font-medium mb-2">{label}</p>
      <div className="h-32 rounded-md border flex items-center justify-center text-sm text-muted-foreground">
        {image ? (
          <img
            src={image}
            alt={label}
            className="h-full w-full object-cover rounded-md"
          />
        ) : (
          "No image uploaded"
        )}
      </div>
    </div>
  );
}
