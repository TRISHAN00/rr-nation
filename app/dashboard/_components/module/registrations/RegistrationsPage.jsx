"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { getAllOrders } from "@/services/admin/admin.event.service";
import { getDashboardEventInfo } from "@/services/admin/admin.overview.service";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import OrderHeader from "./_components/OrderHeader";
import OrderList from "./_components/OrderList";
import OrderPagination from "./_components/OrderPagination";
import OrderSearch from "./_components/OrderSearch";
import OrderSheet from "./_components/OrderSheet";
import OrderSheetHeader from "./_components/OrderSheetHeader";
import OrderStats from "./_components/OrderStats";
import { OrderStatsSkeleton } from "./_components/Skeleton/OrderSkeleton";

const paymentStatusConfig = {
  completed: {
    label: "Paid",
    icon: CheckCircle,
    className:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className:
      "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "bg-destructive/15 text-destructive border-destructive/20",
  },
};

export default function RegistrationsPage() {
  const [loading, setLoading] = useState(true);
  const [selectedReg, setSelectedReg] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [stats, setStats] = useState({});

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showRegItem, setShowRegItem] = useState(0);
  const itemsPerPage = showRegItem || 50;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllOrders(currentPage, itemsPerPage);
      const resOverview = await getDashboardEventInfo();

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
  }, [currentPage, showRegItem]); //

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleViewDetails = (reg) => {
    setSelectedReg(reg);
    setIsSheetOpen(true);
  };

  const handleExportCSV = () => {
    // 1. Define Headers
    const headers = [
      "Participant Name",
      "Participant Email",
      "Participant Phone",
      "Event Name",
      "Ticket Category",
      "Distance",
      "T-Shirt Size",
      "Blood Group",
      "Gender",
      "Community",
      "Amount Paid",
      "Status",
      "Transaction ID",
      "Payment Date",
      "Account Holder",
      "Account Holder Email",
    ];

    // 2. Map and Flatten Data
    // We use flatMap because one order (reg) can have multiple participants (items)
    const csvData = registeredUsers.flatMap((reg) => {
      return reg.order.items.map((item) => {
        const p = item.participant;
        const u = reg.user;

        return [
          `"${p?.name || "N/A"}"`,
          `"${p?.email || "N/A"}"`,
          `"${p?.contactNumber || "N/A"}"`,
          `"${item.eventTicket?.event?.name || "N/A"}"`,
          `"${item.eventTicket?.name || "N/A"}"`,
          `"${p?.distanceCategory || "N/A"}"`,
          `"${p?.tshirtSize || "N/A"}"`,
          `"${p?.bloodGroup || "N/A"}"`,
          `"${p?.gender || "N/A"}"`,
          `"${p?.communityName || "Individual"}"`,
          Math.ceil(reg.afterDiscountAmount),
          reg.status,
          `"${reg.transactionId}"`,
          `"${new Date(reg.paymentDate).toLocaleDateString()}"`,
          `"${u?.firstName} ${u?.lastName}"`,
          `"${u?.email}"`,
        ];
      });
    });

    // 3. Construct CSV String
    const csvContent = [headers, ...csvData]
      .map((row) => row.join(","))
      .join("\n");

    // 4. Trigger Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Using a dynamic filename with current page
    link.setAttribute("href", url);
    link.setAttribute("download", `Event_Participants_Page_${currentPage}.csv`);

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

      <OrderSearch setShowRegItem={setShowRegItem} showRegItem={showRegItem} />

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
