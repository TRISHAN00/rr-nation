"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { getAllOrders } from "@/services/admin/admin.event.service";
import { getDashboardEventInfo } from "@/services/admin/admin.overview.service";
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

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllOrders(currentPage, itemsPerPage, searchQuery);
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
  }, [currentPage, itemsPerPage, searchQuery, showRegItem]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, currentPage, showRegItem]);

  const handleViewDetails = (reg) => {
    setSelectedReg(reg);
    setIsSheetOpen(true);
  };


  const handleExportCSV = () => {
    // 1. Define Headers
    const headers = [
      "Participant Name", /* 1 */
      "Participant Email", /* 2 */
      "Participant Phone", /* 3 */
      "Event Name", /* 4 */
      "Coupon", /* 5 */
      "Ticket Category", /* 6 */
      "Runner Category", /* 6 */
      "Age Category", /* 6 */
      "DOB", /* 6 */
      "Distance", /* 7 */
      "T-Shirt Size", /* 8 */
      "Blood Group", /* 9 */
      "Gender", /* 10 */
      "Community", /* 11 */
      "Amount Paid", /* 12 */
      "Status", /* 13 */
      "Transaction ID", /* 14 */
      "Payment Date", /* 15 */
      "Account Holder", /* 16 */
      "Account Holder Email", /* 17 */
    ];

    // 2. Map and Flatten Data
    // We use flatMap because one order (reg) can have multiple participants (items)
    const csvData = registeredUsers.flatMap((reg) => {
      console.log(reg?.dicountCoupon?.code);
      return reg.order.items.map((item) => {
        const p = item.participant;
        const u = reg.user;

        return [
          `"${p?.name || "N/A"}"`, /* 1 */
          `"${p?.email || "N/A"}"`, /* 2 */
          `"${p?.contactNumber || "N/A"}"`, /* 3 */
          `"${item.eventTicket?.event?.name || "N/A"}"`, /* 4 */
          `"${reg?.dicountCoupon?.code || "N/A"}"`, /* 5 */
          `"${item.eventTicket?.name || "N/A"}"`, /* 6 */
          `"${p.runnerCategory || "N/A"}"`, /* 6 */
          `"${p.dateOfBirth || "N/A"}"`, /* 6 */
          `"${p.ageCategory || "N/A"}"`, /* 6 */
          `"${p?.distanceCategory || "N/A"}"`, /* 7 */
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

      <OrderSearch setShowRegItem={setShowRegItem} showRegItem={showRegItem} setSearchQuery={setSearchQuery} />

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
