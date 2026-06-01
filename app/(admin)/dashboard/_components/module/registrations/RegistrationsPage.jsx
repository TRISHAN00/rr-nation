"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { getAllOrders } from "@/services/admin/admin.event.service";
import { getDashboardEventById } from "@/services/admin/admin.overview.service";
import { useCallback, useEffect, useState } from "react";
import OrderHeader from "./_components/OrderHeader";
import OrderList from "./_components/OrderList";
import OrderPagination from "./_components/OrderPagination";
import OrderSearch from "./_components/OrderSearch";
import OrderSheet from "./_components/OrderSheet";
import OrderSheetHeader from "./_components/OrderSheetHeader";
import OrderStats from "./_components/OrderStats";
import { OrderStatsSkeleton } from "./_components/Skeleton/OrderSkeleton";

export default function RegistrationsPage() {
  const [loading, setLoading] = useState(true);
  const [selectedReg, setSelectedReg] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showRegItem, setShowRegItem] = useState(0);
  const itemsPerPage = showRegItem || 50;
  const [selectedEventId, setSelectedEventId] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllOrders(currentPage, itemsPerPage, searchQuery, selectedEventId);

      const resOverview = await getDashboardEventById(selectedEventId);

      const items = res?.data?.items || [];
      const total = res?.data?.totalPages || 1;

      setStats(resOverview?.data);
      setRegisteredUsers(items);
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchQuery, showRegItem, selectedEventId]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, currentPage, showRegItem, selectedEventId]);

  const handleViewDetails = (reg) => {
    setSelectedReg(reg);
    setIsSheetOpen(true);
  };

  const handleExportCSV = () => {
    // 1. Gather all unique dynamic formData labels across the current dataset
    const dynamicLabelsSet = new Set();

    registeredUsers?.forEach((reg) => {
      reg.order?.items?.forEach((item) => {
        if (Array.isArray(item.formData)) {
          item.formData.forEach((field) => {
            if (field.label) {
              // Trim whitespace to avoid generating duplicate columns for slightly varied strings
              dynamicLabelsSet.add(field.label.trim());
            }
          });
        }
      });
    });

    // Convert Set into an array to maintain a solid column sorting structure
    const dynamicHeaders = Array.from(dynamicLabelsSet);

    // 2. Define Static Base Headers
    const baseHeaders = [
      "User Name",
      "User Email",
      "Event Name",
      "Event Address",
      "Event Banner Image",
      "Event Stage",
      "Event Type",
      "Event Organizer",
      "Event Time",
      "Event Ticket Name",
      "Event Ticket Distance",
      "Event Ticket Price",
      "Participant Name",
      "Participant Age Category",
      "Participant Bib Number",
      "Participant Blood Group",
      "Participant Contact Number",
      "Participant Date of Birth",
      "Participant Distance Category",
      "Participant Email",
      "Participant Emergency Contact Name",
      "Participant Emergency Contact Number",
      "Participant Gender",
      "Participant Runner Category",
      "Participant Tshirt Size",

    ];

    // Combine static tracking headers with parsed form labels
    const finalHeaders = [...baseHeaders, ...dynamicHeaders];

    // 3. Map and Flatten Data Matrices
    const csvData = registeredUsers?.flatMap((reg) => {
      return (reg.order?.items || []).map((item) => {
        console.log("Processing item for CSV export:", reg);
        const e = item.eventTicket?.event || {};
        const evt = item.eventTicket || {};
        const p = item.participant || {};
        const u = reg.user || {};

        console.log(u)

        // Build a temporary key/value lookup map for this row item's form fields
        const formDataMap = {};
        if (Array.isArray(item.formData)) {
          item.formData.forEach((field) => {
            if (field.label) {
              formDataMap[field.label.trim()] = field.value;
            }
          });
        }

        // Construct baseline static string segments (Order matches baseHeaders completely)
        const baseRowData = [
          `"${u.firstName || ""} ${u.lastName || ""}"`,
          `"${u.email || ""}"`,
          `"${e.name || ""}"`,
          `"${e.address || "N/A"}"`,
          `"${e.bannerImage || "N/A"}"`,
          `"${e.eventStage || "N/A"}"`,
          `"${e.eventType || "N/A"}"`,
          `"${e.organizerName || "N/A"}"`,
          `"${e.time || "N/A"}"`,
          `"${evt.name || "N/A"}"`,
          `"${evt.distance || "N/A"}"`,
          `"${evt.price || "N/A"}"`,
          `"${p.name || "N/A"}"`,
          `"${p.ageCategory || "N/A"}"`,
          `"${p.bibNumber || "N/A"}"`,
          `"${p.bloodGroup || "N/A"}"`,
          `"${p.contactNumber || "N/A"}"`,
          `"${p.dateOfBirth || "N/A"}"`,
          `"${p.distanceCategory || "N/A"}"`,
          `"${p.email || "N/A"}"`,
          `"${p.emergencyContactName || "N/A"}"`,
          `"${p.emergencyContactNumber || "N/A"}"`,
          `"${p.gender || "N/A"}"`,
          `"${p.runnerCategory || "N/A"}"`,
          `"${p.tshirtSize || "N/A"}"`,
        ];

        // Match missing or existing dynamic values to the sequence of dynamicHeaders columns
        const dynamicRowData = dynamicHeaders.map((label) => {
          const val = formDataMap[label];
          // Fill missing intersections with an empty text cell so layout bounds match correctly
          return val !== null && val !== undefined ? `"${val}"` : `""`;
        });

        // Concat the flat columns together
        return [...baseRowData, ...dynamicRowData];
      });
    });

    // 4. Construct CSV String
    const csvContent = [finalHeaders, ...csvData]
      .map((row) => row.join(","))
      .join("\n");

    // 5. Trigger Browser download pipeline
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", `Event_Participants_Page_${currentPage || 1}.csv`);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 bg-background text-foreground">
      <OrderHeader
        handleExportCSV={handleExportCSV}
        title={"Order History"}
        desc={`Real-time aggregate totals across all pages.`}
      />

      {loading && registeredUsers.length === 0 ? (
        <OrderStatsSkeleton />
      ) : (
        <OrderStats stats={stats} />
      )}

      <OrderSearch setShowRegItem={setShowRegItem} showRegItem={showRegItem} setSearchQuery={setSearchQuery} setSelectedEventId={setSelectedEventId} selectedEventId={selectedEventId} />

      <OrderList
        registeredUsers={registeredUsers}
        handleViewDetails={handleViewDetails}
        loading={loading}
      />

      {/* ADD PAGINATION HERE */}
      {!loading && registeredUsers.length > 0 && (
        <OrderPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* DETAILED INFORMATION SHEET */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md w-full bg-card border-l border-border overflow-y-auto p-0">
          {/* Header Section */}
          {selectedReg && <OrderSheetHeader selectedReg={selectedReg} />}

          {selectedReg && <OrderSheet selectedReg={selectedReg} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}