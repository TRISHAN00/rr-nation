import {
    TableHead,
    TableHeader,
    TableRow
} from "@/app/components/ui/table";

export default function CouponMemberTableHeader() {
    return (
        <TableHeader className="bg-muted/50">
            <TableRow>
                {/* 1. ID */}
                <TableHead className="w-[80px]">ID</TableHead>
                
                {/* 2. Event Name */}
                <TableHead>Event Name</TableHead>
                
                {/* 3. Running Category */}
                <TableHead className="text-center">Category</TableHead>
                
                {/* 4. Registration & Discount Pricing */}
                <TableHead>Fee (Orig/After)</TableHead>
                
                {/* 5. Registration Identifier / Member Info */}
                <TableHead>Reg No / Email</TableHead>
                
                {/* 6. Payment Processing Gateway State */}
                <TableHead>Gateway / Txn ID</TableHead>
                
                {/* 7. Run Logs Verification Status */}
                <TableHead>Run Status</TableHead>
                
                {/* 8. Event Date */}
                <TableHead>Event Date</TableHead>
                
                {/* 9. Approval Visibility Badges */}
                <TableHead>Approval</TableHead>
                
                {/* 10. Actions Grid Column Layout */}
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
    );
}