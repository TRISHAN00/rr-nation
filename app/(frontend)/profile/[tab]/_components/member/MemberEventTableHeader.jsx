import {
    TableHead,
    TableHeader,
    TableRow
} from "@/app/components/ui/table";

export default function CouponMemberTableHeader() {
    return (
        <TableHeader className="bg-muted/50">
            <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Event Name</TableHead>
                <TableHead>Event Date</TableHead>
                <TableHead>Runner Category</TableHead>
                <TableHead>Organizer Name</TableHead>
                <TableHead>Registration Fee</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Strava Link</TableHead>
                <TableHead>Website Link</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
    );
}
