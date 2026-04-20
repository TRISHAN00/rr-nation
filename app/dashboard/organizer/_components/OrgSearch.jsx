import { Input } from "@base-ui/react";
import { Search } from "lucide-react";

export default function OrgSearch() {
    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search by name..."
                className="pl-9 h-10 bg-muted/20 border-muted focus-visible:ring-primary w-full"
            />
        </div>
    );
}
