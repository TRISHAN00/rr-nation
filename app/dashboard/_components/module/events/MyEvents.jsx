"use client"
import { EventDetailDialog } from "@/components/dashboard/EventDetailDialog";
import { EventFilters } from "@/components/dashboard/EventFilters";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { mockEvents } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import { Download, Eye, MoreHorizontal, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

export default function MyEvents() {
  const { toast } = useToast();

  const [events, setEvents] = useState(mockEvents);
  const [searchName, setSearchName] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [cancellingEvent, setCancellingEvent] = useState(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [viewingEvent, setViewingEvent] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesName = event.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesDate = filterDate ? event.date === filterDate : true;
      return matchesName && matchesDate;
    });
  }, [events, searchName, filterDate]);

  const handleClearFilters = () => {
    setSearchName("");
    setFilterDate("");
  };

  const handleOpenView = (event) => {
    setViewingEvent(event);
    setIsDetailDialogOpen(true);
  };

  const handleOpenCancel = (event) => {
    setCancellingEvent(event);
    setIsCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (!cancellingEvent) return;

    setEvents((prev) =>
      prev.map((e) =>
        e.id === cancellingEvent.id
          ? { ...e, registrationStatus: "Cancelled" }
          : e
      )
    );

    toast({
      title: "Registration Cancelled",
      description: `Your registration for "${cancellingEvent.name}" has been cancelled.`,
      variant: "destructive",
    });

    setCancellingEvent(null);
    setIsCancelDialogOpen(false);
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          My Events
        </h2>
        <p className="text-muted-foreground">
          View and manage all your event registrations.
        </p>
      </div>

      {/* Filters */}
      <Card className="stat-card-shadow">
        <CardContent className="pt-6">
          <EventFilters
            searchName={searchName}
            onSearchNameChange={setSearchName}
            filterDate={filterDate}
            onFilterDateChange={setFilterDate}
            onClearFilters={handleClearFilters}
          />
        </CardContent>
      </Card>

      {/* Desktop Table */}
      <Card className="stat-card-shadow hidden md:block">
        <CardContent className="p-0">
          {filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <h3 className="text-lg font-medium text-foreground">
                No events found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your filters.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Registration</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <p className="font-medium text-foreground">
                        {event.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {event.location}
                      </p>
                    </TableCell>

                    <TableCell>
                      <p className="text-foreground">
                        {format(parseISO(event.date), "MMM d, yyyy")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {event.time}
                      </p>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">{event.type}</Badge>
                    </TableCell>

                    <TableCell>
                      <StatusBadge
                        status={event.registrationStatus}
                        type="registration"
                      />
                    </TableCell>

                    <TableCell>
                      <StatusBadge
                        status={event.paymentStatus}
                        type="payment"
                      />
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleOpenView(event)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>

                          {event.ticketId && (
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Ticket
                            </DropdownMenuItem>
                          )}

                          {event.registrationStatus !== "Cancelled" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleOpenCancel(event)}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel Registration
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Mobile View */}
      <div className="space-y-4 md:hidden">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="stat-card-shadow">
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
              <CardDescription>{event.location}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {format(parseISO(event.date), "MMM d, yyyy")} · {event.time}
              </div>

              <div className="flex gap-2">
                <StatusBadge
                  status={event.registrationStatus}
                  type="registration"
                />
                <StatusBadge
                  status={event.paymentStatus}
                  type="payment"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenView(event)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cancel Dialog */}
      <DeleteConfirmDialog
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
        onConfirm={handleConfirmCancel}
        title="Cancel Registration?"
        description={
          cancellingEvent
            ? `Are you sure you want to cancel your registration for "${cancellingEvent.name}"? This action cannot be undone.`
            : ""
        }
      />

      {/* Detail Dialog */}
      <EventDetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        event={viewingEvent}
      />
    </div>
  );
}
