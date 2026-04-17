"use client";

import {
  Loader2
} from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


import HeaderProfile from "@/app/(frontend)/profile/_components/HeaderProfile";
import TabActions from "@/app/(frontend)/profile/_components/TabActions";
import TabContents from "@/app/(frontend)/profile/_components/TabContents";
import { Tabs } from "@/app/components/ui/tabs";
import { getAllUserOrders } from "@/services/user.service";

export default function UserProfileTabs({ user, memberInfo }) {
  const params = useParams();
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync active tab with URL slug
  const allowedTabs = ["me", "settings", "security", "member"];
  const activeTab = params.tab || "me";

  const handleTabChange = (value) => {
    router.push(`/profile/${value}`);
  };

  useEffect(() => {
    if (!allowedTabs.includes(activeTab)) {
      notFound();
    }
  }, [activeTab]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await getAllUserOrders();
        setOrders(res.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  // --- Data Transformations ---
  const allTickets = orders.flatMap((payment) =>
    payment.order.items.map((item) => ({
      ...item,
      transactionId: payment.transactionId,
      paymentStatus: payment.status,
      paymentDate: payment.paymentDate,
    }))
  );

  const totalSpent = orders.reduce((acc, curr) => acc + parseFloat(curr.afterDiscountAmount || 0), 0);
  const now = new Date();
  const upcomingEvents = allTickets.filter(item => new Date(item.eventTicket.event.date) >= now);
  const pastEvents = allTickets.filter(item => new Date(item.eventTicket.event.date) < now);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4 sm:p-6 pt-16 sm:pt-20">
      <HeaderProfile />

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabActions />
        <TabContents allTickets={allTickets} upcomingEvents={upcomingEvents} orders={orders} totalSpent={totalSpent} pastEvents={pastEvents} user={user} memberInfo={memberInfo} />
      </Tabs>
    </div>
  );
}

