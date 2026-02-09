"use client"
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
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
import { Switch } from "@/app/components/ui/switch";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Briefcase,
  CheckCircle,
  DollarSign,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const initialServices = [
  {
    id: 1,
    name: "Event Planning & Management",
    description: "Complete end-to-end event planning and management services for running events of any scale. Includes venue selection, logistics, volunteer management, and day-of coordination.",
    price: "Contact for quote",
    isActive: true,
    features: ["Venue Selection", "Route Planning", "Volunteer Management", "Timing Systems"],
  },
  {
    id: 2,
    name: "Corporate Running Events",
    description: "Specialized corporate team-building running events. Perfect for company wellness programs and team bonding activities.",
    price: "Starting from ৳50,000",
    isActive: true,
    features: ["Custom Branding", "Team Coordination", "Medals & Certificates", "Photography"],
  },
  {
    id: 3,
    name: "Running Coaching",
    description: "Professional running coaching for beginners to advanced runners. Personalized training plans and group sessions available.",
    price: "৳5,000/month",
    isActive: true,
    features: ["Personalized Plans", "Weekly Sessions", "Progress Tracking", "Nutrition Guidance"],
  },
  {
    id: 4,
    name: "Marathon Training Camps",
    description: "Intensive training camps for marathon preparation. Multi-day programs with expert coaches and comprehensive support.",
    price: "৳15,000/camp",
    isActive: false,
    features: ["Expert Coaches", "Accommodation", "Nutrition Support", "Recovery Sessions"],
  },
  {
    id: 5,
    name: "Event Photography & Media",
    description: "Professional photography and videography services for running events. Capture every moment of your event.",
    price: "Starting from ৳25,000",
    isActive: true,
    features: ["Professional Photos", "Video Coverage", "Drone Footage", "Quick Delivery"],
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newFeatures, setNewFeatures] = useState([""]);

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const toggleActive = (id) => {
    setServices(
      services.map((s) =>
        s.id === id ? { ...s, isActive: !s.isActive } : s
      )
    );
  };

  const addFeature = () => {
    setNewFeatures([...newFeatures, ""]);
  };

  const updateFeature = (index, value) => {
    const updated = [...newFeatures];
    updated[index] = value;
    setNewFeatures(updated);
  };

  const removeFeature = (index) => {
    setNewFeatures(newFeatures.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setNewFeatures([""]);
    setIsCreateOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-display">Add New Service</DialogTitle>
              <DialogDescription>Create a new service offering</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Service Name *</Label>
                <Input id="name" placeholder="Enter service name" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the service in detail..."
                  rows={4}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" placeholder="e.g., ৳5,000/month or Contact for quote" />
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Features</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Feature
                  </Button>
                </div>
                {newFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="e.g., Personalized Plans"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                    />
                    {newFeatures.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive shrink-0"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <Label htmlFor="active">Active Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Service will be visible when active
                  </p>
                </div>
                <Switch id="active" defaultChecked />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={resetForm}>Add Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Services Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className={`transition-all hover:shadow-md ${
              !service.isActive ? "opacity-60" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={service.isActive ? "default" : "secondary"}
                      className={
                        service.isActive
                          ? "bg-success/10 text-success border-success/20"
                          : ""
                      }
                    >
                      {service.isActive ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {service.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <CardTitle className="font-display text-lg">{service.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleActive(service.id)}>
                      {service.isActive ? (
                        <>
                          <XCircle className="mr-2 h-4 w-4" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Activate
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="line-clamp-2 pt-1">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">{service.price}</span>
              </div>

              {service.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Briefcase className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="font-display text-lg font-medium">No services found</h3>
          <p className="text-muted-foreground">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
}
