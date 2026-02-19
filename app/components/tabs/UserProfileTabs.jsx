"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Award,
  Calendar,
  Clock,
  DollarSign,
  Loader2,
  Lock,
  MapPinned,
  ShoppingBag,
  User
} from "lucide-react";
import { useEffect, useState } from "react";

// Assuming your API service is in this path

import { getAllUserOrders } from "@/services/user.service";
import ChangePasswordForm from "../profile/ChangePasswordForm";
import EmergencyContactForm from "../profile/EmergencyContactForm";
import PersonalInformationForm from "../profile/PersonalInformationForm";
import UpdateProfilePhoto from "../profile/UpdateProfilePhoto";

export default function UserProfileTabs({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await getAllUserOrders();
        // Accessing the 'data' array from your response body
        setOrders(res.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  // --- Data Transformation ---
  
  // 1. Flatten items because one order can have multiple tickets
  const allTickets = orders.flatMap((payment) =>
    payment.order.items.map((item) => ({
      ...item,
      transactionId: payment.transactionId,
      paymentStatus: payment.status,
      paymentDate: payment.paymentDate,
    }))
  );

  // 2. Calculations
  const totalSpent = orders.reduce((acc, curr) => acc + parseFloat(curr.afterDiscountAmount || 0), 0);
  
  const upcomingEvents = allTickets.filter(item => 
    new Date(item.eventTicket.event.date) >= new Date()
  );
  
  const pastEvents = allTickets.filter(item => 
    new Date(item.eventTicket.event.date) < new Date()
  );

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4 sm:p-6 pt-16 sm:pt-20">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">My Profile</h1>
        <p className="text-gray-600 text-sm mt-1">
          Manage your events, profile, and security settings
        </p>
      </div>

      <Tabs defaultValue="my-events" className="w-full">
        <TabsList className="w-full justify-start border-b bg-transparent p-0 h-auto overflow-x-auto flex-nowrap">
          <TabsTrigger value="my-events" className="tab-style">
            <Calendar className="h-4 w-4 mr-2" />
            <span>My Events</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="tab-style">
            <User className="h-4 w-4 mr-2" />
            <span>Profile Settings</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="tab-style">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* --- My Events Tab --- */}
        <TabsContent value="my-events" className="mt-6 space-y-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <StatCard 
              title="Total Events" 
              value={allTickets.length} 
              sub={`${upcomingEvents.length} upcoming`} 
              icon={Calendar} 
            />
            <StatCard 
              title="Total Orders" 
              value={orders.length} 
              sub="Transactions" 
              icon={ShoppingBag} 
            />
            <StatCard 
              title="Total Spent" 
              value={`৳${totalSpent.toLocaleString()}`} 
              sub="Paid Amount" 
              icon={DollarSign} 
            />
          </div>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">All Registered Events</CardTitle>
              <CardDescription>Complete list of events you've joined</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <EventListSection title="Upcoming Events" events={upcomingEvents} />
              <div className="border-t pt-6">
                <EventListSection title="Past Events" events={pastEvents} isPast />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Profile Settings Tab --- */}
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card className="border-gray-200">
            <CardHeader><CardTitle>Profile Photo</CardTitle></CardHeader>
            <CardContent>
              <UpdateProfilePhoto initialImage={user?.image} />
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
            <CardContent><PersonalInformationForm user={user} /></CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader><CardTitle>Emergency Contact</CardTitle></CardHeader>
            <CardContent><EmergencyContactForm /></CardContent>
          </Card>
        </TabsContent>

        {/* --- Security Tab --- */}
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card className="border-gray-200">
            <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
            <CardContent><ChangePasswordForm /></CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader><CardTitle>Forgot Password</CardTitle></CardHeader>
            <CardContent className="space-y-4">
               <p className="text-sm text-gray-700">Send a reset link to <strong>{user?.email}</strong></p>
               <button className="px-6 py-2 bg-black text-white rounded-md text-sm">Send Reset Link</button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// --- Internal Helper Components ---

function StatCard({ title, value, sub, icon: Icon }) {
  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-4 w-4 text-brand" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-gray-600 mt-1">{sub}</p>
      </CardContent>
    </Card>
  );
}

function EventListSection({ title, events, isPast }) {
  if (events.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      {events.map((item, index) => {
        const eventData = item.eventTicket.event;
        return (
          <div
            key={index}
            className={`p-4 border rounded-lg mb-3 hover:bg-gray-50 transition ${isPast ? "opacity-70" : ""}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
              <div className="flex-1">
                <h4 className="font-bold text-base text-dark">
                  {eventData.name} <span className="text-brand text-sm ml-2">[{item.eventTicket.name}]</span>
                </h4>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {new Date(eventData.date).toDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {eventData.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3" /> {item.eventTicket.distance}
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
                  <MapPinned className="h-3 w-3 shrink-0" />
                  <span>{eventData.address}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase self-start ${isPast ? 'bg-gray-200' : 'bg-[#F39200] text-white'}`}>
                {item.paymentStatus}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 border-t gap-3 text-[11px]">
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-gray-500">
                <p>ORDER: <span className="text-dark font-medium">{item.transactionId.substring(0, 12)}...</span></p>
                <p>PARTICIPANT: <span className="text-dark font-medium">{item.participant.name}</span></p>
                <p>AMOUNT: <span className="text-dark font-medium">৳{item.totalPrice}</span></p>
              </div>
              <button className="text-brand font-bold hover:underline text-right">
                VIEW RECEIPT
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}