"use client";

import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OrderPagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex items-center justify-between px-2 py-4 border-t border-border">
      <div className="text-sm text-muted-foreground">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {/* Simple Page Numbers (Optional: can be expanded for many pages) */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
             // Logic to show pages around current page if totalPages is large
             const pageNum = i + 1; 
             return (
               <Button
                 key={pageNum}
                 variant={currentPage === pageNum ? "default" : "outline"}
                 size="sm"
                 onClick={() => setCurrentPage(pageNum)}
                 className="h-8 w-8 p-0 text-xs"
               >
                 {pageNum}
               </Button>
             );
          })}
          {totalPages > 5 && <span className="text-muted-foreground text-xs">...</span>}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}