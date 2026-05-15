import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateEvTicketModal from "./CreateEvTicketModal";

export default function EvTicketPageHeader({ eventId, onRefresh }  ) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Tickets</h2>

            <Button className={` flex gap-x-1`} onClick={() => setOpen(true)}>
                <Plus />
                Create Ticket
            </Button>

            <CreateEvTicketModal open={open} setOpen={setOpen} eventId={eventId} onRefresh={onRefresh} />
        </div>
    )
}
