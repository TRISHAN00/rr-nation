"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { UserListSkeleton } from "./skeleton/UserSkeleton";

export default function UserTable({ users, loading }) {
  // Defensive check to prevent "Cannot read properties of null"
  const hasUsers = users && users.length > 0;

  const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  // Returns "Jun 5, 1982" or "05/06/1982" based on locale
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(date);
};

  return (
    <Card className="border-border bg-card shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Birth Date</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <UserListSkeleton numberOfRow={10} />
            ) : (
              users?.map((user) => {
                const firstLetter = user?.firstName?.charAt(0) || "U";
                const lastLetter = user?.lastName?.charAt(0) || "";

                return (
                  <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      #{user.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border">
                          <AvatarImage src={user.image} alt={user.firstName} />
                          <AvatarFallback className="text-xs bg-primary/10">
                            {firstLetter}{lastLetter}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium whitespace-nowrap">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground italic">
                      {user.userName || "—"}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {user.phone || "—"}
                    </TableCell>
                    <TableCell className="capitalize">
                      {user.gender || "—"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDate(user.birthDate) || "—"}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {user.address || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.isActive ? "success" : "secondary"}
                        className={user.isActive ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20" : ""}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {!loading && !hasUsers && (
          <div className="py-20 text-center text-muted-foreground">
            No users found matching your search.
          </div>
        )}
      </CardContent>
    </Card>
  );
}