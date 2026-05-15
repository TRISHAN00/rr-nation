
import {
    TableHead,
    TableHeader,
    TableRow
} from "@/app/components/ui/table";


export default function CouponMemberTableHeader() {
    return (
        <TableHeader className="bg-muted/50">
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Coupon Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
    )
}
