"use client";

import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function MemberPaginationFooter() {
  return (
    <div className="flex items-center justify-between px-4 py-4 border-x border-b bg-muted/10 rounded-b-xl">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-bold text-foreground">1-10</span> of{" "}
          <span className="font-bold text-foreground">120</span> members
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1 mr-4">
          <span className="text-[11px] text-muted-foreground">
            Rows per page:
          </span>
          <Select defaultValue="10">
            <SelectTrigger className="h-7 w-17 text-[11px] bg-transparent border-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-primary text-primary-foreground"
            >
              1
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
          </div>

          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
