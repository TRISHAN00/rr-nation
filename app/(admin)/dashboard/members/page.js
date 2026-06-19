"use client";

import { updateMemberStatus } from "@/services/admin/admin.member.service";
import { useState } from "react";
import { toast } from "sonner";
import { useDashboardMembers } from "../context/MemberContext";

import OrderHeader from "../_components/module/registrations/_components/OrderHeader";
import ActionConfirmationModal from "./_components/ActionConfirmationModal";
import MemberActions from "./_components/MemberActions";
import MemberList from "./_components/MemberList";
import { MemberPaginationFooter } from "./_components/MemberPaginationFooter";
import MemberStats from "./_components/MemberStats";

// 🔥 Import the newly separated side sheet component
import MemberDetailsSheet from "./_components/MemberDetailsSheet";

export default function DashboardMemberPage() {
  const {
    members,
    loading,
    setAdminApproval,
    setMemberType,
    setPaymentStatus,
    fetchMembers,
  } = useDashboardMembers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("approve");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Sheet presentation visibility state wrapper
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenModal = (member, type) => {
    setSelectedMember(member);
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleConfirmAction = async (selectedType) => {
    if (!selectedMember) return;

    setIsUpdating(true);
    try {
      const payload = {
        memberId: selectedMember.id,
        adminApproval: actionType === "approve" ? "approved" : "rejected",
        memberType: selectedType || selectedMember.memberType,
      };

      await updateMemberStatus(payload);

      toast.success(`Member ${payload.adminApproval} successfully!`);
      setIsModalOpen(false);

      if (fetchMembers) fetchMembers();
      else window.location.reload(); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleViewDetails = (member) => {
    console.log("Viewing details for member:", member);
    setSelectedMember(member);
    setIsSheetOpen(true);
  };

  const handleExportCSV = () => {
    const headers = [
      "Member ID", "First Name", "Last Name", "Email", "Registration Date",
      "Age", "District", "Delivery Address", "T-Shirt Size", "Member Type",
      "Event Type", "Occupation", "Special Skill", "Running Distance (KM)",
      "Is Event Staff", "Past Events", "Recommendation Msg", "Payment Status",
      "Payment Date", "Payment Gateway", "Transaction ID", "Original Amount",
      "Discount", "Paid Amount", "Currency", "Admin Approval",
    ];

    const csvData = members.map((m) => {
      const u = m.user || {};
      const clean = (val) => val ? `"${String(val).replace(/"/g, '""')}"` : '""';

      return [
        clean(m.registrationNumber), clean(u.firstName), clean(u.lastName), clean(u.email),
        clean(m.createdAt ? new Date(m.createdAt).toLocaleDateString() : ""), m.age || 0,
        clean(m.district), clean(m.deliveryAddress), clean(m.tShirtSize), clean(m.memberType),
        clean(m.eventType), clean(m.occupation), clean(m.specialSkill), m.preferableRunningDistance || 0,
        m.isEventStaff ? "YES" : "NO", m.eventsParticipatedNumber || 0, clean(m.recommendationMessage),
        clean(m.paymentStatus), clean(m.paymentDate ? new Date(m.paymentDate).toLocaleDateString() : ""),
        clean(m.paymentGateway), clean(m.transactionId), m.orginalAmount || 0, m.discountAmount || 0,
        m.afterDiscountAmount || 0, clean(m.currency), clean(m.adminApproval),
      ];
    });

    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
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
        title="Member Registration History"
        desc={`Real-time aggregate totals across all pages.`}
      />

      <MemberStats />

      <MemberActions
        setAdminApproval={setAdminApproval}
        setMemberType={setMemberType}
        setPaymentStatus={setPaymentStatus}
      />

      <MemberList
        members={members}
        loading={loading}
        onAction={handleOpenModal}
        onViewDetails={handleViewDetails}
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

      {/* 🔥 DETAILED INFORMATION SIDE-SHEET COMPONENT */}
      <MemberDetailsSheet 
        isOpen={isSheetOpen} 
        onOpenChange={setIsSheetOpen} 
        selectedMember={selectedMember} 
      />
    </>
  );
}