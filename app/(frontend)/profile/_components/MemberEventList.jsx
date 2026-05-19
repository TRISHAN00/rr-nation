import { Card, CardContent } from "@/app/components/ui/card";
import { Table } from "@/app/components/ui/table";
import { getMemberEvents } from "@/services/member.service";
import { useEffect, useState } from "react";
import MemberEventPageHeader from "../[tab]/_components/member/MemberEventPageHeader";
import MemberEventTableBody from "../[tab]/_components/member/MemberEventTableBody";
import CouponMemberTableHeader from "../[tab]/_components/member/MemberEventTableHeader";

export default function MemberEventList() {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <>
      <MemberEventPageHeader onRefresh={fetchEvents} />
      
      <Card className="border-border bg-card shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            {/* HEADER */}
            <CouponMemberTableHeader />

            {/* BODY */}
            <MemberEventTableBody events={events} loading={loading} onRefresh={fetchEvents} />
          </Table>


          {/* EMPTY STATE */}
          {!loading && events.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No events found.
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}