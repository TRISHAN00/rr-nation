"use client"
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Image, Search, Trash2, Upload } from "lucide-react";
import { useState } from "react";

const initialGallery = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=300&fit=crop",
    title: "Marathon Start Line",
    event: "Annual Marathon 2024",
    category: "events",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop",
    title: "Runners in Action",
    event: "5K Fun Run",
    category: "events",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1461896836934- voices?w=400&h=300&fit=crop",
    title: "Community Gathering",
    event: "Community Meetup",
    category: "community",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=400&h=300&fit=crop",
    title: "Award Ceremony",
    event: "Annual Marathon 2024",
    category: "events",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop",
    title: "Training Session",
    event: "Training Camp",
    category: "training",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=400&h=300&fit=crop",
    title: "Finish Line Celebration",
    event: "Night Run 2024",
    category: "events",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    title: "Team Photo",
    event: "Corporate Run",
    category: "community",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=400&h=300&fit=crop",
    title: "Pre-Race Warmup",
    event: "Half Marathon",
    category: "training",
  },
];

export default function GalleryPage() {
  const [gallery, setGallery] = useState(initialGallery);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredGallery = gallery.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.event.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || image.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSelect = (id) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setGallery(gallery.filter((img) => !selectedImages.includes(img.id)));
    setSelectedImages([]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Gallery</h1>
          <p className="text-muted-foreground">
            Manage photos from events and community moments
          </p>
        </div>
        <div className="flex gap-2">
          {selectedImages.length > 0 && (
            <Button variant="destructive" onClick={handleDeleteSelected} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Delete ({selectedImages.length})
            </Button>
          )}
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Images
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">Upload Images</DialogTitle>
                <DialogDescription>Add new photos to your gallery</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your images here, or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Browse Files
                  </Button>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event">Associated Event</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marathon-2024">Annual Marathon 2024</SelectItem>
                      <SelectItem value="fun-run">5K Fun Run</SelectItem>
                      <SelectItem value="night-run">Night Run 2024</SelectItem>
                      <SelectItem value="training">Training Session</SelectItem>
                      <SelectItem value="community">Community Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsUploadOpen(false)}>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="training">Training</SelectItem>
            <SelectItem value="community">Community</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredGallery.map((image) => (
          <Card
            key={image.id}
            className={`group overflow-hidden cursor-pointer transition-all ${
              selectedImages.includes(image.id) ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => toggleSelect(image.id)}
          >
            <CardContent className="p-0 relative">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=300&fit=crop";
                  }}
                />
              </div>
              <div className="absolute top-2 left-2">
                <Checkbox
                  checked={selectedImages.includes(image.id)}
                  className="bg-background/80 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={() => toggleSelect(image.id)}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-sm font-medium text-white truncate">{image.title}</p>
                <p className="text-xs text-white/70">{image.event}</p>
              </div>
              <Badge
                variant="secondary"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
              >
                {image.category}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGallery.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Image className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="font-display text-lg font-medium">No images found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
