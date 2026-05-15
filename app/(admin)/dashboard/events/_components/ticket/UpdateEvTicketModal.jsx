import { Button } from "@/app/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { updateTicket } from "@/services/admin/admin.ticket.service";
import { useEffect, useState } from "react";
// Import your service here, e.g.


export default function UpdateEventTicketModal({ open, setOpen, ticket, eventId, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        distance: "",
        price: "",
        availableSlots: "",
        status: "active"
    });

    useEffect(() => {
        if (ticket) {
            setFormData({
                name: ticket.name || "",
                distance: ticket.distance || "",
                price: ticket.price || "",
                availableSlots: ticket.availableSlots || "",
                status: ticket.status || "active"
            });
        }
    }, [ticket]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            
            // Matches the required array-of-objects structure
            const payload = [
                {
                    ticketId: ticket.id, // Maps internal 'id' to 'ticketId' for the API
                    name: formData.name,
                    distance: formData.distance,
                    price: Number(formData.price),
                    availableSlots: Number(formData.availableSlots),
                    status: formData.status
                }
            ];

            // Example API Call:
            await updateTicket(eventId, payload);
            
            console.log("Submitting to PATCH /admin/ticket/", eventId, payload);
            
            if (onSuccess) onSuccess();
            setOpen(false);
        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update {formData.name || "Ticket"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Ticket Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="distance">Distance</Label>
                            <Input
                                id="distance"
                                name="distance"
                                value={formData.distance}
                                onChange={handleChange}
                                placeholder="e.g. 10 Km"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price (৳)</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="availableSlots">Available Slots</Label>
                        <Input
                            id="availableSlots"
                            name="availableSlots"
                            type="number"
                            value={formData.availableSlots}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}