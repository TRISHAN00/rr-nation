import { Card, CardContent } from "@/app/components/ui/card";
import { Table } from "@/app/components/ui/table";
import { getTicketsById } from "@/services/admin/admin.ticket.service";
import { useEffect, useState } from "react";
import EvTicketPageHeader from "./EvTicketPageHeader";
import EvTicketTableBody from "./EvTicketTableBody";
import EvTicketTableHeader from "./EvTicketTableHeader";

export default function EvTicketList({ eventId }) {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const res = await getTicketsById(eventId);
            console.log("Tickets fetched:", res);
            setTickets(res?.data?.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [eventId]);

    return (
        <>
            <EvTicketPageHeader eventId={eventId} onRefresh={fetchTickets} />

            <Card className={`border-border bg-card shadow-sm overflow-hidden`} >
                <CardContent className="p-0">
                    <Table>
                        {/* HEADER */}
                        <EvTicketTableHeader />

                        {/* BODY */}
                        <EvTicketTableBody tickets={tickets} loading={loading} onRefresh={fetchTickets} eventId={eventId} />
                    </Table>

                </CardContent>
            </Card>
        </>
    )
}
