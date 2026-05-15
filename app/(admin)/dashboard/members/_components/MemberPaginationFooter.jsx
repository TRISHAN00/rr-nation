"use client";
import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDashboardMembers } from "../../context/MemberContext";

export function MemberPaginationFooter() {
  const { page, setPage, totalItems, limit } = useDashboardMembers();
  
  const totalPages = Math.ceil(totalItems / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-4 border rounded-xl bg-card my-4">
      <p className="text-xs text-muted-foreground">
        Total <span className="font-bold text-foreground">{totalItems}</span> members
      </p>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        
        <span className="text-xs font-medium">
          Page {page} of {totalPages}
        </span>

        <Button 
          variant="outline" 
          size="sm" 
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}