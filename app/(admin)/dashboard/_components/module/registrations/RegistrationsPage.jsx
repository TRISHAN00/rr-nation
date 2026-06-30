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

  const handleBibUpdate = (orderItemId, updatedFields) => {
    const updateItem = (reg) => ({
      ...reg,
      order: {
        ...reg.order,
        items: reg.order.items.map((item) =>
          item.id === orderItemId
            ? { ...item, bib: { ...item.bib, ...updatedFields } }
            : item
        ),
      },
    });

    setSelectedReg((prev) => (prev ? updateItem(prev) : prev));
    setRegisteredUsers((prev) => prev.map((reg) => updateItem(reg)));
  };

  const handleExportCSV = () => {
    const dynamicLabelsSet = new Set();
    registeredUsers?.forEach((reg) => {
      reg.order?.items?.forEach((item) => {
        if (Array.isArray(item.formData)) {
          item.formData.forEach((field) => {
            if (field.label) dynamicLabelsSet.add(field.label.trim());
          });
        }
      });
    });
    const dynamicHeaders = Array.from(dynamicLabelsSet);

    const baseHeaders = [
      "Transaction ID", "Payment Gateway", "Payment Status", "Payment Date",
      "Coupon Code", "Coupon Discount Type", "Coupon Value",
      "Order Total Amount", "Order Discount Amount", "Order After Discount",
      "User ID", "User First Name", "User Last Name", "User Email", "User Phone", "User Address", "User Image", "User Gender", "User Birth Date",
      "Event ID", "Event Name", "Event Slug", "Event Date", "Event Time", "Event Address", "Event Type", "Event Stage", "Organizer Name",
      "Event Banner Image", "Min Package Price", "Package Type", "Event Status", "Event Admin Approval",
      "Ticket ID", "Ticket Name", "Distance", "Price", "Available Slots", "Used Slots", "Ticket Status",
      "Order Item ID", "Item Type", "Quantity", "Unit Price", "Total Price",
      "Participant Name", "Participant Email", "Participant Contact Number",
      "Delivery Address", "District", "Distance Category", "Age Category", "T-Shirt Size",
      "Gender", "Date of Birth", "Blood Group", "Religion",
      "Emergency Contact Name", "Emergency Contact Number",
      "Community Name", "Community Discount Code", "Participated Event Numbers",
      "Runner Category", "Cycle Frame Size", "Cycle Brand Name", "Participant BIB Number",
      "BIB ID", "BIB Number", "BIB Attachment", "BIB Submission Links",
      "Certificate Download Link", "Admin Approval", "Tracking", "BIB Created At", "BIB Updated At",
    ];

    const finalHeaders = [...baseHeaders, ...dynamicHeaders];

    const csvData = registeredUsers?.flatMap((reg) => {
      return (reg.order?.items || []).map((item) => {
        const e = item.eventTicket?.event || {};
        const evt = item.eventTicket || {};
        const p = item.participant || {};
        const u = reg.user || {};
        const bib = item.bib || {};
        const dc = reg.dicountCoupon || {};
        const subLinks = bib.submissionLinks?.map(s => `${s.title}: ${s.link}`).join("; ") || "";

        const formDataMap = {};
        if (Array.isArray(item.formData)) {
          item.formData.forEach((field) => {
            if (field.label) formDataMap[field.label.trim()] = field.value;
          });
        }

        const baseRowData = [
          `"${reg.transactionId || ""}"`, `"${reg.paymentGateway || ""}"`, `"${reg.status || ""}"`, `"${reg.paymentDate || ""}"`,
          `"${dc.code || ""}"`, `"${dc.discountType || ""}"`, `"${dc.value || ""}"`,
          `"${reg.order?.totalAmount || ""}"`, `"${reg.discountAmount || ""}"`, `"${reg.afterDiscountAmount || ""}"`,
          `"${u.id || ""}"`, `"${u.firstName || ""}"`, `"${u.lastName || ""}"`, `"${u.email || ""}"`, `"${u.phone || ""}"`, `"${u.address || ""}"`, `"${u.image || ""}"`, `"${u.gender || ""}"`, `"${u.birthDate || ""}"`,
          `"${e.id || ""}"`, `"${e.name || ""}"`, `"${e.slug || ""}"`, `"${e.date || ""}"`, `"${e.time || ""}"`, `"${e.address || ""}"`, `"${e.eventType || ""}"`, `"${e.eventStage || ""}"`, `"${e.organizerName || ""}"`,
          `"${e.bannerImage || ""}"`, `"${e.minPackagePrice || ""}"`, `"${e.packageType || ""}"`, `"${e.status || ""}"`, `"${e.adminApproval || ""}"`,
          `"${evt.id || ""}"`, `"${evt.name || ""}"`, `"${evt.distance || ""}"`, `"${evt.price || ""}"`, `"${evt.availableSlots || ""}"`, `"${evt.usedSlots || ""}"`, `"${evt.status || ""}"`,
          `"${item.id || ""}"`, `"${item.itemType || ""}"`, `"${item.quantity || ""}"`, `"${item.unitPrice || ""}"`, `"${item.totalPrice || ""}"`,
          `"${p.name || ""}"`, `"${p.email || ""}"`, `"${p.contactNumber || ""}"`,
          `"${p.deliveryAddress || ""}"`, `"${p.district || ""}"`, `"${p.distanceCategory || ""}"`, `"${p.ageCategory || ""}"`, `"${p.tshirtSize || ""}"`,
          `"${p.gender || ""}"`, `"${p.dateOfBirth || ""}"`, `"${p.bloodGroup || ""}"`, `"${p.religion || ""}"`,
          `"${p.emergencyContactName || ""}"`, `"${p.emergencyContactNumber || ""}"`,
          `"${p.communityName || ""}"`, `"${p.communityDiscountCode || ""}"`, `"${p.participatedEventNumbers || ""}"`,
          `"${p.runnerCategory || ""}"`, `"${p.cycleFrameSize || ""}"`, `"${p.cycleBrandName || ""}"`, `"${p.bibNumber || ""}"`,
          `"${bib.id || ""}"`, `"${bib.bibNumber || ""}"`, `"${bib.bibAttachment || ""}"`, `"${subLinks}"`,
          `"${bib.certificateDownloadLink || ""}"`, `"${bib.adminApproval || ""}"`, `"${bib.tracking || ""}"`, `"${bib.createdAt || ""}"`, `"${bib.updatedAt || ""}"`,
        ];

        const dynamicRowData = dynamicHeaders.map((label) => {
          const val = formDataMap[label];
          return val !== null && val !== undefined ? `"${val}"` : `""`;
        });

        return [...baseRowData, ...dynamicRowData];
      });
    });

    const csvContent = [finalHeaders, ...csvData]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Event_Participants_${new Date().toISOString().slice(0, 10)}.csv`);
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

          {selectedReg && <OrderSheet selectedReg={selectedReg} onBibUpdate={handleBibUpdate} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}