import { Input } from "@/app/components/ui/input";
import { Search, X } from "lucide-react";

export default function DashboardEventSearch({ search, setSearch }) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search events..."
        className="h-10 pl-9 pr-9"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setSearch("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}