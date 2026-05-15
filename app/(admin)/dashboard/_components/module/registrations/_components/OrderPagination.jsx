"use client";

import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function OrderPagination({ currentPage, totalPages, setCurrentPage }) {
  // Logic to calculate which page numbers to display
  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    // Adjust start if we're near the end of the list
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4 border-t border-border">
      {/* Page Status */}
      <div className="text-sm text-muted-foreground order-2 sm:order-1">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-2 order-1 sm:order-2">
        {/* Jump to First Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="hidden h-8 w-8 p-0 lg:flex"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Dynamic Page Numbers */}
        <div className="flex items-center gap-1">
          {/* Show ellipsis if we aren't starting at Page 1 */}
          {visiblePages[0] > 1 && (
            <span className="text-muted-foreground px-1 text-xs">...</span>
          )}

          {visiblePages.map((pageNum) => (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(pageNum)}
              className="h-8 w-8 p-0 text-xs"
            >
              {pageNum}
            </Button>
          ))}

          {/* Show ellipsis if there are more pages after the current window */}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <span className="text-muted-foreground px-1 text-xs">...</span>
          )}
        </div>

        {/* Next Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Jump to Last Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="hidden h-8 w-8 p-0 lg:flex"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}