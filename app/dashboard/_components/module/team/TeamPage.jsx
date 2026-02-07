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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Edit,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

const initialTeam = [
  {
    id: 1,
    name: "Connie Diaz",
    role: "CEO & Founder",
    email: "connie@runrise.com",
    phone: "+880 1889 996700",
    avatar: "",
    initials: "CD",
    status: "active",
  },
  {
    id: 2,
    name: "John Smith",
    role: "Event Manager",
    email: "john@runrise.com",
    phone: "+880 1889 996701",
    avatar: "",
    initials: "JS",
    status: "active",
  },
  {
    id: 3,
    name: "Sarah Wilson",
    role: "Marketing Head",
    email: "sarah@runrise.com",
    phone: "+880 1889 996702",
    avatar: "",
    initials: "SW",
    status: "active",
  },
  {
    id: 4,
    name: "Mike Johnson",
    role: "Community Manager",
    email: "mike@runrise.com",
    phone: "+880 1889 996703",
    avatar: "",
    initials: "MJ",
    status: "active",
  },
  {
    id: 5,
    name: "Emily Chen",
    role: "Content Writer",
    email: "emily@runrise.com",
    phone: "+880 1889 996704",
    avatar: "",
    initials: "EC",
    status: "inactive",
  },
  {
    id: 6,
    name: "David Brown",
    role: "Technical Lead",
    email: "david@runrise.com",
    phone: "+880 1889 996705",
    avatar: "",
    initials: "DB",
    status: "active",
  },
];

export default function TeamPage() {
  const [team, setTeam] = useState(initialTeam);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredTeam = team.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    setTeam(team.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Team</h1>
          <p className="text-muted-foreground">Manage your team members and roles</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">Add Team Member</DialogTitle>
              <DialogDescription>
                Add a new member to your team
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Event Manager</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="community">Community Manager</SelectItem>
                    <SelectItem value="content">Content Writer</SelectItem>
                    <SelectItem value="tech">Technical Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@runrise.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+880 1889 996700" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Add Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Team Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeam.map((member) => (
          <Card key={member.id} className="transition-all hover:shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-primary/20">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-display font-semibold text-card-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <Badge
                      variant={member.status === "active" ? "default" : "secondary"}
                      className={`mt-1.5 ${
                        member.status === "active"
                          ? "bg-success/10 text-success border-success/20"
                          : ""
                      }`}
                    >
                      {member.status}
                    </Badge>
                  </div>
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
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 space-y-2 border-t border-border pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {member.phone}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeam.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="font-display text-lg font-medium">No team members found</h3>
          <p className="text-muted-foreground">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
}
