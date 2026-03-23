"use client";
import { updateMemberStatus } from "@/services/admin/admin.member.service"; // Ensure path is correct
import { useState } from "react";
import { toast } from "sonner";
import OrderHeader from "../_components/module/registrations/_components/OrderHeader";
import { useDashboardMembers } from "../context/MemberContext";
import ActionConfirmationModal from "./_components/ActionConfirmationModal";
import MemberActions from "./_components/MemberActions";
import MemberList from "./_components/MemberList";
import { MemberPaginationFooter } from "./_components/MemberPaginationFooter";

export default function DashboardMemberPage() {
  const {
    members,
    loading,
    setAdminApproval,
    setMemberType,
    setPaymentStatus,
    fetchMembers,
  } = useDashboardMembers();

  console.log(members);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("approve");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOpenModal = (member, type) => {
    setSelectedMember(member);
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedMember) return;

    setIsUpdating(true);
    try {
      const payload = {
        memberId: selectedMember.id,
        adminApproval: actionType === "approve" ? "approved" : "rejected",
        memberType: selectedMember.memberType,
      };

      await updateMemberStatus(payload);

      toast.success(`Member ${payload.adminApproval} successfully!`);
      setIsModalOpen(false);

      // Refresh the list
      if (fetchMembers) fetchMembers();
      else window.location.reload(); // Fallback
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  // Export CSV file
  const handleExportCSV = () => {
    // 1. Define Headers for all fields in your JSON
    const headers = [
      "Reg. No",
      "First Name",
      "Last Name",
      "Email",
      "Registration Date",
      "Age",
      "District",
      "Delivery Address",
      "T-Shirt Size",
      "Member Type",
      "Event Type",
      "Occupation",
      "Special Skill",
      "Running Distance (KM)",
      "Is Event Staff",
      "Past Events",
      "Recommendation Msg",
      "Payment Status",
      "Payment Date",
      "Payment Gateway",
      "Transaction ID",
      "Original Amount",
      "Discount",
      "Paid Amount",
      "Currency",
      "Admin Approval",
    ];

    // 2. Map Data (Using the 'members' array from your context/state)
    const csvData = members.map((m) => {
      const u = m.user || {};

      // helper to handle potentially null values and prevent CSV breaking with commas
      const clean = (val) =>
        val ? `"${String(val).replace(/"/g, '""')}"` : '""';

      return [
        clean(m.registrationNumber),
        clean(u.firstName),
        clean(u.lastName),
        clean(u.email),
        clean(m.createdAt ? new Date(m.createdAt).toLocaleDateString() : ""),
        m.age || 0,
        clean(m.district),
        clean(m.deliveryAddress),
        clean(m.tShirtSize),
        clean(m.memberType),
        clean(m.eventType),
        clean(m.occupation),
        clean(m.specialSkill),
        m.preferableRunningDistance || 0,
        m.isEventStaff ? "YES" : "NO",
        m.eventsParticipatedNumber || 0,
        clean(m.recommendationMessage),
        clean(m.paymentStatus),
        clean(
          m.paymentDate ? new Date(m.paymentDate).toLocaleDateString() : "",
        ),
        clean(m.paymentGateway),
        clean(m.transactionId),
        m.orginalAmount || 0,
        m.discountAmount || 0,
        m.afterDiscountAmount || 0,
        clean(m.currency),
        clean(m.adminApproval),
      ];
    });

    // 3. Construct CSV String
    const csvContent = [headers, ...csvData]
      .map((row) => row.join(","))
      .join("\n");

    // 4. Trigger Download
    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;",
    }); // Added BOM for Excel UTF-8 support
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const fileName = `Member_Export_${new Date().toISOString().split("T")[0]}.csv`;
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <OrderHeader
        handleExportCSV={handleExportCSV}
        title="Member Order History"
      />
      <MemberActions
        setAdminApproval={setAdminApproval}
        setMemberType={setMemberType}
        setPaymentStatus={setPaymentStatus}
      />

      <MemberList
        members={members}
        loading={loading}
        onAction={handleOpenModal} // Pass the opener to the list
      />

      <MemberPaginationFooter />

      <ActionConfirmationModal
        selectedMember={selectedMember}
        isOpen={isModalOpen}
        type={actionType}
        isLoading={isUpdating}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAction}
      />
    </>
  );
}
