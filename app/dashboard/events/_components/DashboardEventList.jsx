"use client";
import { Card, CardContent } from "@/app/components/ui/card";
import { Collapsible } from "@/app/components/ui/collapsible";
import { CalendarClock, Monitor, Radio, Trophy } from "lucide-react";
import { useState } from "react";
import DashboardPackageContent from "../_components/DashboardPackageContent";
import DashboardEventCardHeader from "./DashboardEventCardHeader";
import EventMeta from "./EventMeta";

const eventTypes = {
  live: {
    label: "Live",
    icon: Radio,
  },
  virtual: {
    label: "Virtual",
    icon: Monitor,
  },
  upcoming: {
    label: "Upcoming",
    icon: CalendarClock,
  },
  successful: {
    label: "Successful",
    icon: Trophy,
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
              <div className="h-1.5 bg-linear-to-r from-primary to-primary/70" />
              <DashboardEventCardHeader
                TypeIcon={TypeIcon}
                typeConfig={typeConfig}
                expandedEvent={expandedEvent}
                event={event}
              />

              <CardContent className="pt-0">
                <EventMeta event={event} />

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
