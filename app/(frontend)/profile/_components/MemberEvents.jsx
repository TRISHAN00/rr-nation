"use client"
import { getMemberEvents } from "@/services/member.service";
import { useEffect, useState } from "react";
import MemberEventList from "./MemberEventList";
import { toast } from "sonner";

export default function MemberEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await getMemberEvents(1, 10);
      // Fallback directly to res if API returns the array wrapper at root instead of data.items
      const eventItems = res?.data?.items || res?.data || res || [];
      setEvents(eventItems);
    } catch (error) {
      console.error("Error fetching member events:", error);
      toast.error(error?.response?.data?.message || error?.response?.data?.error || error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading events...</div>;
  }

  return (
    <>
      <MemberEventList events={events} />
    </>
  );
}