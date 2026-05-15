"use client"
import { getAllDashboardOrganizers } from "@/services/admin/admin.organizer";
import { useEffect, useState } from "react";
import OrderHeader from "../_components/module/registrations/_components/OrderHeader";
import OrganizerActions from "./_components/OrganizerActions";
import OrgList from "./_components/OrgList";

export default function DashboardOrganizerPage() {
    const [organizers, setOrganizers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true); 
        try {
            const res = await getAllDashboardOrganizers();

            if (res?.statusCode === 200) {
                setOrganizers(res?.data?.items || []);
            }
        } catch (error) {
            console.error("Error fetching organizers:", error);
        } finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <OrderHeader
                title="Organizer Registration History"
                desc="Real-time aggregate totals across all pages."
            />

            <OrganizerActions onRefresh={fetchData} />

            {/* Pass state as props to OrgList */}
            <OrgList data={organizers} loading={loading} />
        </div>
    )
}