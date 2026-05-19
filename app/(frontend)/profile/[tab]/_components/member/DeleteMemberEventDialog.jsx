"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { deleteMemberEventById } from "@/services/member.service";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DeleteMemberEventDialog({
  open,
  setOpen,
  eventId,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Screen layout observer checklist
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };
    
    // Initial call & listener sync
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = async () => {
    if (!eventId) {
      toast.error("Invalid Event ID record resource reference.");
      return;
    }

    try {
      setLoading(true);
      await deleteMemberEventById(eventId);

      toast.success("Member event deleted successfully.");
      onSuccess();
      setOpen(false);
    } catch (error) {
      console.error("Delete event entry failed:", error);
      toast.error(error?.response?.data?.message || "Failed to remove member event records.");
    } finally {
      setLoading(false);
    }
  };

  // Shared inner content layout fragment to keep code DRY
  const RenderContent = () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 border-b pb-3 md:border-0 md:pb-0">
        <div className="p-2 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-full shrink-0">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="text-left">
          <h3 className="text-lg font-semibold text-foreground leading-tight hidden md:block">
            Delete Member Event
          </h3>
          <p className="text-xs text-muted-foreground md:hidden">
            This action cannot be undone.
          </p>
        </div>
      </div>

      <div className="text-left">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Are you sure you want to remove this running event log? This action will permanently drop this item from the member history timeline metrics and cannot be undone.
        </p>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-4 md:mt-2">
        <Button 
          type="button"
          variant="outline" 
          onClick={() => setOpen(false)}
          disabled={loading}
          className="h-10 md:h-9 text-xs w-full sm:w-auto"
        >
          Cancel
        </Button>

        <Button
          type="button"
          variant="destructive"
          onClick={handleDelete}
          disabled={loading}
          className="h-10 md:h-9 text-xs px-4 w-full sm:w-auto font-medium"
        >
          {loading ? "Deleting Record..." : "Confirm Delete"}
        </Button>
      </div>
    </div>
  );

  // DESKTOP INTERFACE: Renders centered dialog
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader className="hidden">
            <DialogTitle>Delete Member Event</DialogTitle>
          </DialogHeader>
          <RenderContent />
        </DialogContent>
      </Dialog>
    );
  }

  // MOBILE INTERFACE: Renders clean bottom sheet drawer layout
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="p-5 pt-2 pb-6 max-h-[85vh]">
        <DrawerHeader className="p-0 text-left mb-3">
          <DrawerTitle className="text-lg font-bold">Delete Member Event</DrawerTitle>
        </DrawerHeader>
        <RenderContent />
      </DrawerContent>
    </Drawer>
  );
}