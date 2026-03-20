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

  console.log(members)

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

  return (
    <>
      <OrderHeader title="Member Order History" />
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