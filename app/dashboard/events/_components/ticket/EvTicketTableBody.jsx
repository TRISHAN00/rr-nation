import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/app/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteEventTicketDialog from "./DeleteEventTicketDialog";
import UpdateEventTicketModal from "./UpdateEvTicketModal";

export default function EvTicketTableBody({ tickets, loading, onRefresh, eventId }) {

    const [editOpen, setEditOpen] = useState(false);
        const [deleteOpen, setDeleteOpen] = useState(false);
        const [selectedCoupon, setSelectedCoupon] = useState(null);
    
        const handleEdit = (ticket) => {
            setSelectedCoupon(ticket);
            setEditOpen(true);
        };
    
        const handleDeleteClick = (ticket) => {
            setSelectedCoupon(ticket);
            setDeleteOpen(true);
        };
    if (loading) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                        Loading tickets...
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    return (
        <>
            <TableBody>
                {tickets?.map((ticket, index) => (
                    <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{ticket.name}</TableCell>
                        <TableCell>{ticket.distance}</TableCell>
                        <TableCell>৳{ticket.price}</TableCell>
                        <TableCell>{ticket.availableSlots}</TableCell>
                        <TableCell>{ticket.usedSlots}</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <Badge variant={ticket.isActive ? "default" : "secondary"}>
                                    {ticket.isActive ? "Active" : "Inactive"}
                                </Badge>

                                {ticket.isArchived && (
                                    <Badge variant="destructive">Archived</Badge>
                                )}
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                                {/* Edit */}
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleEdit(ticket)}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>

                                {/* Delete */}
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleDeleteClick(ticket)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

            {/* EDIT MODAL */}
            <UpdateEventTicketModal
                open={editOpen}
                setOpen={setEditOpen}
                ticket={selectedCoupon}
                onSuccess={onRefresh}
                eventId={eventId}
            />

            {/* DELETE DIALOG */}
            <DeleteEventTicketDialog
                open={deleteOpen}
                setOpen={setDeleteOpen}
                ticketId={selectedCoupon?.id}
                ticketName={selectedCoupon?.name}
                onSuccess={onRefresh}
            />
        </>
    );
}