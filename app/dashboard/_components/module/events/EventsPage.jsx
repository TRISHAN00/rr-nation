"use client";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Calendar,
  CalendarClock,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit,
  Eye,
  MapPin,
  Monitor,
  MoreHorizontal,
  Package,
  Plus,
  Radio,
  Search,
  Shirt,
  Trash2,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { RegistrationFormSettings } from "./RegistrationFormSettings";
import { TShirtSizeManager } from "./TShirtSizeManager";

const eventTypes = {
  live: {
    label: "Live",
    icon: Radio,
    className: "bg-red-500/10 text-red-600 border-red-500/20",
  },
  virtual: {
    label: "Virtual",
    icon: Monitor,
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  upcoming: {
    label: "Upcoming",
    icon: CalendarClock,
    className: "bg-warning/10 text-warning border-warning/20",
  },
  successful: {
    label: "Successful",
    icon: Trophy,
    className: "bg-success/10 text-success border-success/20",
  },
};

const initialEvents = [
  {
    id: 1,
    title: "Accounting Day Run 2025",
    date: "2025-11-07",
    time: "06:00",
    venue: "Hatirjheel, Dhaka",
    type: "upcoming",
    description:
      "Annual running event for accountants and finance professionals.",
    organizer: "Run Rise Nation",
    packages: [
      { id: 1, distance: "5km", price: 500, slots: 100, registered: 45 },
      { id: 2, distance: "10km", price: 800, slots: 150, registered: 89 },
      { id: 3, distance: "21km", price: 1200, slots: 50, registered: 32 },
    ],
    totalRegistrations: 166,
    tshirtSettings: {
      enabled: true,
      required: true,
      categories: ["tshirt", "kids"],
    },
  },
  {
    id: 2,
    title: "Virtual Marathon Challenge",
    date: "2025-12-15",
    time: "00:00",
    venue: "Online - Run Anywhere",
    type: "virtual",
    description:
      "Join from anywhere in the world! Track your run with any GPS app.",
    organizer: "Run Rise Nation",
    packages: [
      { id: 1, distance: "5km", price: 300, slots: 500, registered: 234 },
      { id: 2, distance: "10km", price: 500, slots: 300, registered: 156 },
    ],
    totalRegistrations: 390,
    tshirtSettings: { enabled: false, required: false, categories: [] },
  },
  {
    id: 3,
    title: "5K Fun Run",
    date: "2025-02-06",
    time: "07:00",
    venue: "Gulshan Park, Dhaka",
    type: "live",
    description: "Family-friendly fun run happening right now!",
    organizer: "Run Rise Nation",
    packages: [
      { id: 1, distance: "3km", price: 300, slots: 200, registered: 198 },
      { id: 2, distance: "5km", price: 500, slots: 150, registered: 145 },
    ],
    totalRegistrations: 343,
    tshirtSettings: { enabled: true, required: false, categories: ["tshirt"] },
  },
  {
    id: 4,
    title: "Corporate Team Run 2024",
    date: "2024-10-20",
    time: "06:30",
    venue: "Dhanmondi Lake",
    type: "successful",
    description:
      "Team building event for corporate organizations - Successfully completed!",
    organizer: "Corporate Events BD",
    packages: [
      { id: 1, distance: "5km", price: 600, slots: 300, registered: 300 },
      { id: 2, distance: "10km", price: 900, slots: 200, registered: 220 },
    ],
    totalRegistrations: 520,
    tshirtSettings: { enabled: true, required: true, categories: ["tshirt"] },
  },
  {
    id: 5,
    title: "Night Run 2024",
    date: "2024-09-15",
    time: "18:00",
    venue: "Uttara Sector 4",
    type: "successful",
    description:
      "Annual night run - Successfully completed with 380 participants!",
    organizer: "Run Rise Nation",
    packages: [
      { id: 1, distance: "5km", price: 500, slots: 200, registered: 200 },
      { id: 2, distance: "10km", price: 700, slots: 180, registered: 180 },
    ],
    totalRegistrations: 380,
    tshirtSettings: {
      enabled: true,
      required: false,
      categories: ["tshirt", "kids"],
    },
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [newPackages, setNewPackages] = useState([
    { distance: "", price: "", slots: "" },
  ]);
  const [tshirtConfig, setTshirtConfig] = useState(null);
  const [formFieldsConfig, setFormFieldsConfig] = useState(null);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const addPackage = () => {
    setNewPackages([...newPackages, { distance: "", price: "", slots: "" }]);
  };

  const removePackage = (index) => {
    setNewPackages(newPackages.filter((_, i) => i !== index));
  };

  const updatePackage = (index, field, value) => {
    const updated = [...newPackages];
    updated[index][field] = value;
    setNewPackages(updated);
  };

  const resetForm = () => {
    setNewPackages([{ distance: "", price: "", slots: "" }]);
    setTshirtConfig(null);
    setFormFieldsConfig(null);
    setIsCreateOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Events
          </h1>
          <p className="text-muted-foreground">
            Manage your running events with packages
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display">
                Create New Event
              </DialogTitle>
              <DialogDescription>
                Add a new running event with registration packages
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Basic Info */}
              <div className="grid gap-2">
                <Label htmlFor="title">Event Name *</Label>
                <Input id="title" placeholder="Enter event name" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input id="time" type="time" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="venue">Venue/Address *</Label>
                  <Input id="venue" placeholder="Event location" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Event Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="live">
                        <div className="flex items-center gap-2">
                          <Radio className="h-4 w-4 text-red-500" />
                          Live
                        </div>
                      </SelectItem>
                      <SelectItem value="virtual">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4 text-blue-500" />
                          Virtual
                        </div>
                      </SelectItem>
                      <SelectItem value="upcoming">
                        <div className="flex items-center gap-2">
                          <CalendarClock className="h-4 w-4 text-warning" />
                          Upcoming
                        </div>
                      </SelectItem>
                      <SelectItem value="successful">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-success" />
                          Successful
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="organizer">Organizer Name *</Label>
                <Input id="organizer" placeholder="e.g., Run Rise Nation" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Event details..."
                  rows={3}
                />
              </div>

              {/* Packages Section */}
              <div className="border-t border-border pt-4 mt-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label className="text-base font-semibold">
                      Registration Packages
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Add different distance packages with pricing
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPackage}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Package
                  </Button>
                </div>

                <div className="space-y-3">
                  {newPackages.map((pkg, index) => (
                    <div
                      key={index}
                      className="flex gap-3 items-end p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex-1 grid gap-2">
                        <Label className="text-xs">Distance</Label>
                        <Input
                          placeholder="e.g., 5km"
                          value={pkg.distance}
                          onChange={(e) =>
                            updatePackage(index, "distance", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex-1 grid gap-2">
                        <Label className="text-xs">Price (BDT)</Label>
                        <Input
                          type="number"
                          placeholder="e.g., 500"
                          value={pkg.price}
                          onChange={(e) =>
                            updatePackage(index, "price", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex-1 grid gap-2">
                        <Label className="text-xs">Available Slots</Label>
                        <Input
                          type="number"
                          placeholder="e.g., 100"
                          value={pkg.slots}
                          onChange={(e) =>
                            updatePackage(index, "slots", e.target.value)
                          }
                        />
                      </div>
                      {newPackages.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 text-destructive shrink-0"
                          onClick={() => removePackage(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* T-Shirt Size Configuration */}
              <div className="border-t border-border pt-4 mt-2">
                <TShirtSizeManager
                  value={tshirtConfig}
                  onChange={setTshirtConfig}
                />
              </div>

              {/* Registration Form Fields Configuration */}
              <div className="border-t border-border pt-4 mt-2">
                <RegistrationFormSettings
                  value={formFieldsConfig}
                  onChange={setFormFieldsConfig}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={resetForm}>Create Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs
          value={filterType}
          onValueChange={setFilterType}
          className="w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="live" className="gap-1">
              <Radio className="h-3 w-3" />
              Live
            </TabsTrigger>
            <TabsTrigger value="virtual" className="gap-1">
              <Monitor className="h-3 w-3" />
              Virtual
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="gap-1">
              <CalendarClock className="h-3 w-3" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="successful" className="gap-1">
              <Trophy className="h-3 w-3" />
              Successful
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event) => {
          const typeConfig = eventTypes[event.type];
          const TypeIcon = typeConfig.icon;
          return (
            <Collapsible
              key={event.id}
              open={expandedEvent === event.id}
              onOpenChange={() =>
                setExpandedEvent(expandedEvent === event.id ? null : event.id)
              }
            >
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="h-1.5 bg-gradient-to-r from-primary to-primary/70" />
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className={typeConfig.className}
                        >
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
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
                      <span className="text-muted-foreground">
                        registrations
                      </span>
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
                              <Badge
                                variant="outline"
                                className="font-semibold"
                              >
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
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="font-display text-lg font-medium">No events found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
