import {
    TableHead,
    TableHeader,
    TableRow
} from "@/app/components/ui/table";

export default function EvTicketTableHeader() {
    return (
        <TableHeader className="bg-muted/50">
            <TableRow>
                <TableHead className="w-[80px]">Sl No.</TableHead>
                <TableHead>Ticket Name</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Available Slots</TableHead>
                <TableHead>Used Slots</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
    )
}