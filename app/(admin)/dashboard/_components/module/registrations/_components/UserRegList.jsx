"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table";
import {
    Eye,
    Loader2
} from "lucide-react";

export default function UserRegList({registeredUsers, loading}) {
    console.log(registeredUsers)
  return (
    <Card className="border-border bg-card shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold text-foreground">
                  Participant
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Event Info
                </TableHead>
                <TableHead className="font-semibold text-foreground text-center">
                  Status
                </TableHead>
                <TableHead className="text-right font-semibold text-foreground">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                  </TableCell>
                </TableRow>
              ) : (
                registeredUsers.map((reg) => {
                
                  return (
                    <TableRow
                      key={reg.id}
                      className="hover:bg-muted/30 border-border"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-border">
                            <AvatarImage src={reg.image} />
                            <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                              {reg.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold">{reg.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {reg.phone}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-xs font-bold uppercase tracking-tight line-clamp-1">
                            {reg.event}
                          </p>
                          <div className="flex gap-1 flex-wrap">
                            <Badge
                              variant="secondary"
                              className="text-[10px] font-medium bg-muted text-muted-foreground border-none"
                            >
                              {reg.package}
                            </Badge>
                            {reg.orderItems.length > 1 && (
                              <Badge className="text-[10px] bg-blue-500/10 text-blue-600 border-none">
                                +{reg.orderItems.length - 1} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={`${status.className} border font-medium`}
                        >
                          <status.icon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(reg)}
                          className="h-8 border-border hover:bg-muted"
                        >
                          <Eye className="h-3.5 w-3.5 mr-2" /> Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
          {!loading && registeredUsers.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No registrations found on this page.
            </div>
          )}
        </CardContent>
      </Card>
  )
}
