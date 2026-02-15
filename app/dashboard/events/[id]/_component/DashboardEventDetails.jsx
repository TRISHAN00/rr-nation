"use client";

import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardTitle
} from "@/app/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import DashboardPackageCard from "../../_components/DashboardPackageCard";

export default function DashboardEventDetails({ event }) {
  if (!event) return null;

  return (
    <div className="space-y-8">
      {/* ---------- BANNER ---------- */}
      <div className="relative w-full h-fit md:h-fit rounded-xl overflow-hidden border">
        {event?.bannerImage ? (
          <img
            src={event.bannerImage}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
            No banner image uploaded
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <Badge
            variant={event.status === "active" ? "default" : "secondary"}
          >
            {event.status?.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* ---------- MAIN INFO ---------- */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Thumbnail */}
            <div className="md:col-span-1">
              <div className="aspect-square rounded-lg overflow-hidden border">
                {event?.thumbImage ? (
                  <img
                    src={event.thumbImage}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground bg-muted">
                    No thumbnail
                  </div>
                )}
              </div>
            </div>

            {/* Event Details */}
            <div className="md:col-span-3 space-y-4">
              <div>
                <CardTitle className="text-2xl">
                  {event.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Organized by{" "}
                  <span className="font-medium">
                    {event.organizerName}
                  </span>
                </p>
              </div>

              <Separator />

              {/* Meta Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
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

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.address}</span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">
                    {event.eventType} event
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold mb-1">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {event.description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ---------- PACKAGES ---------- */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Event Packages
        </h3>

        {event?.packages?.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {event.packages.map((pkg) => (
              <DashboardPackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              No packages added yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
