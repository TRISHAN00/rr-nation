import { Input } from "@/app/components/ui/input";
import { Search } from "lucide-react";

export default function OrgSearch({ value = "", onChange }) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search by organization name..."
        className="pl-9 h-10 bg-muted/20 border-muted focus-visible:ring-primary w-full"
      />
    </div>
  );
}
