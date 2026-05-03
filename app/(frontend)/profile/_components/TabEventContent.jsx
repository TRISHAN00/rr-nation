import { Calendar } from "lucide-react";

export default function TabEventContent() {
  return (
    <TabsContent value="me" className="mt-6 space-y-6">
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
            </TabsContent>
  )
}
