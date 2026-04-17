import EventListSection from "@/app/(frontend)/profile/_components/EventListSection";
import StatCard from "@/app/(frontend)/profile/_components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Calendar, DollarSign, ShoppingBag } from "lucide-react";

export default function MeTab({ allTickets, upcomingEvents, orders, totalSpent, pastEvents }) {
    return (
        <>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <StatCard title="Total Events" value={allTickets.length} sub={upcomingEvents.length + " upcoming"} icon={Calendar} />
                <StatCard title="Total Orders" value={orders.length} sub="Transactions" icon={ShoppingBag} />
                <StatCard title="Total Spent" value={"৳" + totalSpent.toLocaleString()} sub="Paid Amount" icon={DollarSign} />
            </div>

            <Card className="border-gray-200">
                <CardHeader>
                    <CardTitle className="text-lg">All Registered Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <EventListSection title="Upcoming Events" events={upcomingEvents} />
                    <EventListSection title="Past Events" events={pastEvents} isPast />
                </CardContent>
            </Card>
        </>
    );
}