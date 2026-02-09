"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Edit, MoreHorizontal, Plus, Quote, Search, Star, Trash2 } from "lucide-react";
import { useState } from "react";

const initialTestimonials = [
  {
    id: 1,
    name: "Afrin Jahan",
    role: "Marathon Runner",
    quote:
      "Run Rise Nation has transformed my approach to running. The community support and professional events make every race memorable.",
    rating: 5,
    avatar: "",
    initials: "AJ",
  },
  {
    id: 2,
    name: "Rafiq Ahmed",
    role: "Corporate Team Lead",
    quote:
      "Our company has participated in multiple corporate runs. The organization is always top-notch and the team building experience is invaluable.",
    rating: 5,
    avatar: "",
    initials: "RA",
  },
  {
    id: 3,
    name: "Sadia Khan",
    role: "First-time Runner",
    quote:
      "As a beginner, I was nervous about joining. But the welcoming atmosphere and helpful training tips made my first 5K unforgettable!",
    rating: 5,
    avatar: "",
    initials: "SK",
  },
  {
    id: 4,
    name: "Mohammad Hasan",
    role: "Regular Participant",
    quote:
      "The eco-conscious approach to events sets Run Rise apart. Great to be part of a community that cares about fitness and the environment.",
    rating: 4,
    avatar: "",
    initials: "MH",
  },
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.quote.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Testimonials</h1>
          <p className="text-muted-foreground">Manage client feedback and reviews</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">Add Testimonial</DialogTitle>
              <DialogDescription>Add a new client testimonial</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Client Name</Label>
                <Input id="name" placeholder="Enter client name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role/Title</Label>
                <Input id="role" placeholder="e.g., Marathon Runner" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quote">Testimonial</Label>
                <Textarea
                  id="quote"
                  placeholder="What did they say about Run Rise Nation?"
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label>Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button key={star} variant="ghost" size="icon" className="h-8 w-8">
                      <Star className="h-5 w-5 fill-warning text-warning" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Add Testimonial</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search testimonials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="transition-all hover:shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <Quote className="h-8 w-8 text-primary/30" />
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
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-card-foreground mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-card-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Quote className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="font-display text-lg font-medium">No testimonials found</h3>
          <p className="text-muted-foreground">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
}
