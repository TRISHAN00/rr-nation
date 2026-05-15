
import {
    TableHead,
    TableHeader,
    TableRow
} from "@/app/components/ui/table";
export default function EvRegFormFieldTableHeader() {
  return (
    <TableHeader className="bg-muted/50">
      <TableRow>
        {/* Serial Number column */}
        <TableHead className="w-[60px]">#</TableHead>

        {/* Label and Required indicator */}
        <TableHead>Field Label</TableHead>

        {/* Input type (text, email, file, etc.) */}
        <TableHead>Type</TableHead>

        {/* The placeholder text users will see */}
        <TableHead>Placeholder</TableHead>

        {/* Display order in the form */}
        <TableHead>Order</TableHead>

        {/* Status (Active/Inactive) */}
        <TableHead>Status</TableHead>

        {/* Action buttons (Edit/Delete) */}
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  )
}
