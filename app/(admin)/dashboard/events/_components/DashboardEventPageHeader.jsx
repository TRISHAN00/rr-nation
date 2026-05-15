import { Button } from "@/app/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardEventPageHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Events
        </h1>
        <p className="text-muted-foreground">
          Manage your running events with packages
        </p>
      </div>
      <Link href={"/dashboard/events/create"}>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </Link>
    </div>
  );
}
