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
    Radio,
    Shirt,
    Trash2,
    Trophy,
    User,
    Users,
} from "lucide-react";
import { useState } from "react";
import DashboardPackageContent from "../_components/DashboardPackageContent";

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

export default function DashboardEventList() {
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
                <DashboardPackageContent event={event} />
              </CardContent>
            </Card>
          </Collapsible>
        );
      })}
    </div>
  );
}
