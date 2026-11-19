import { TabsContent } from "@/app/components/ui/tabs";

import ShopOrders from "@/app/(frontend)/shop/_components/ShopOrders";
import MemberTab from "./MemberTab";
import MeTab from "./MeTab";
import SecurityTab from "./SecurityTab";
import SettingsTab from "./SettingsTab";

export default function TabContents({
    allTickets,
    upcomingEvents,
    orders,
    totalSpent,
    pastEvents,
    user,
    memberInfo
}) {
    return (
        <div className="tabs-content-transition">
            <TabsContent value="me" className="mt-6 space-y-6">
                <MeTab
                    allTickets={allTickets}
                    upcomingEvents={upcomingEvents}
                    orders={orders}
                    totalSpent={totalSpent}
                    pastEvents={pastEvents}
                />
            </TabsContent>
            
            <TabsContent value="shop-orders" className="mt-6 space-y-6">
                <ShopOrders />
            </TabsContent>
            
            <TabsContent value="member" className="mt-6 space-y-6">
                <MemberTab memberInfo={memberInfo} />
            </TabsContent>

            <TabsContent value="settings" className="mt-6 space-y-6">
                <SettingsTab user={user} />
            </TabsContent>

            <TabsContent value="security" className="mt-6 space-y-6">
                <SecurityTab />
            </TabsContent>


        </div>
    );
}