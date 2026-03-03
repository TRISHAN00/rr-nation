"use client";

import { Input } from "@/app/components/ui/input";
import { Search } from "lucide-react";

export default function UserSearch({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search users by name or email..."
        className="pl-9 bg-background"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}