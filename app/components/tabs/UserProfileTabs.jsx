"use client";

import {
  Calendar,
  DollarSign, Loader2,
  Lock,
  ShoppingBag, User
} from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import MemberDetailView from "@/app/(frontend)/profile/_components/MemberDetailView";
import ChangePasswordForm from "../profile/ChangePasswordForm";
import PersonalInformationForm from "../profile/PersonalInformationForm";
import UpdateProfilePhoto from "../profile/UpdateProfilePhoto";

import EventListSection from "@/app/(frontend)/profile/_components/EventListSection";
import HeaderProfile from "@/app/(frontend)/profile/_components/HeaderProfile";
import StatCard from "@/app/(frontend)/profile/_components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
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
        <TabsList className="w-full justify-start border-b bg-transparent p-0 h-auto overflow-x-auto flex-nowrap">
          <TabsTrigger value="me" className="tab-style">
            <Calendar className="h-4 w-4 mr-2" /> <span>My Events</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="tab-style">
            <User className="h-4 w-4 mr-2" /> <span>Profile Settings</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="tab-style">
            <Lock className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
          <TabsTrigger value="member" className="tab-style">
            <User className="h-4 w-4 mr-2" /> Member
          </TabsTrigger>
        </TabsList>

        <div className="tabs-content-transition">
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

          <TabsContent value="settings" className="mt-6 space-y-6">
            <Card><CardHeader><CardTitle>Profile Photo</CardTitle></CardHeader><CardContent><UpdateProfilePhoto initialImage={user?.image} /></CardContent></Card>
            <Card><CardHeader><CardTitle>Personal Information</CardTitle></CardHeader><CardContent><PersonalInformationForm user={user} /></CardContent></Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6 space-y-6">
            <Card><CardHeader><CardTitle>Change Password</CardTitle></CardHeader><CardContent><ChangePasswordForm /></CardContent></Card>
          </TabsContent>

          <TabsContent value="member" className="mt-6 space-y-6">
            <MemberDetailView member={memberInfo} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

