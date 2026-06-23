import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Table } from "@/app/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce";
import { getMemberEvents } from "@/services/member.service";
import { Calendar, ChevronLeft, ChevronRight, Download, Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import MemberEventPageHeader from "../[tab]/_components/member/MemberEventPageHeader";
import MemberEventTableBody from "../[tab]/_components/member/MemberEventTableBody";
import CouponMemberTableHeader from "../[tab]/_components/member/MemberEventTableHeader";

export default function MemberEventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const search = useDebounce(searchInput, 400);
  const startDate = useDebounce(startDateInput, 400);
  const endDate = useDebounce(endDateInput, 400);
  const totalPages = Math.ceil(totalItems / limit);

  const clearDates = () => {
    setStartDateInput("");
    setEndDateInput("");
  };

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getMemberEvents(page, limit, search, startDate, endDate);
      const eventItems = res?.data?.items || res?.data || res || [];
      setEvents(eventItems);
      setTotalItems(res?.data?.count || res?.data?.total || eventItems.length);
    } catch (error) {
      console.error("Error fetching member events:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, startDate, endDate]);

  useEffect(() => {
    setPage(1);
  }, [search, startDate, endDate]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleExportCSV = () => {
    const headers = [
      "#", "Event Name", "Event Date", "Runner Category", "Organizer Name",
      "Registration Fee", "Venue", "Event Type", "Status",
      "Strava Link", "Website Link",
    ];

    const csvData = events.map((item, idx) => {
      const clean = (val) => val != null ? `"${String(val).replace(/"/g, '""')}"` : '""';
      return [
        (page - 1) * limit + idx + 1,
        clean(item.eventName),
        clean(item.eventDate ? new Date(item.eventDate).toLocaleDateString() : ""),
        clean(item.runningCategory),
        clean(item.organizerName),
        item.registrationFee || 0,
        clean(item.eventVenue),
        clean(item.eventType),
        item.isCompleted ? "Completed" : "Pending",
        clean(item.stravaLink),
        clean(item.eventLink),
      ];
    });

    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Events_Export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <MemberEventPageHeader onRefresh={fetchEvents} onExportCSV={handleExportCSV} events={events} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 my-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-9 h-10"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDateInput(e.target.value)}
              className="pl-8 h-10 w-full sm:w-[160px] text-xs"
            />
          </div>
          <span className="text-xs text-muted-foreground shrink-0">to</span>
          <div className="relative flex-1 sm:flex-initial">
            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="date"
              value={endDateInput}
              onChange={(e) => setEndDateInput(e.target.value)}
              className="pl-8 h-10 w-full sm:w-[160px] text-xs"
            />
          </div>
          {(startDateInput || endDateInput) && (
            <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0" onClick={clearDates} title="Clear dates">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <Card className="border-border bg-card shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <CouponMemberTableHeader />
            <MemberEventTableBody events={events} loading={loading} onRefresh={fetchEvents} page={page} limit={limit} />
          </Table>

          {!loading && events.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No events found.
            </div>
          )}
        </CardContent>
      </Card>

      {totalItems > 0 && (
        <div className="flex items-center justify-between px-4 py-4 border rounded-xl bg-card my-4">
          <p className="text-xs text-muted-foreground">
            Total <span className="font-bold text-foreground">{totalItems}</span> events
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <span className="text-xs font-medium">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}