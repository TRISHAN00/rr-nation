"use client";

import { useEffect, useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Search } from "lucide-react";
import { useDashboardMembers } from "../../context/MemberContext";
import { useDebounce } from "@/hooks/useDebounce";

export default function MemberSearch() {
  const { setSearch } = useDashboardMembers();
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 400);

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search by name..."
        className="pl-9 h-10 bg-muted/20 border-muted focus-visible:ring-primary w-full"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}
