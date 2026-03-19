"use client";
import OrderHeader from "../_components/module/registrations/_components/OrderHeader";
import { useDashboardMembers } from "../context/MemberContext";
import MemberActions from "./_components/MemberActions";
import MemberList from "./_components/MemberList";
import { MemberPaginationFooter } from "./_components/MemberPaginationFooter";

export default function DashboardMemberPage() {
  const { members, loading, setAdminApproval, setMemberType } =
    useDashboardMembers();

  return (
    <>
      <OrderHeader title="Member Order History" />
      <MemberActions
        setAdminApproval={setAdminApproval}
        setMemberType={setMemberType}
      />
      <MemberList members={members} loading={loading} />
      <MemberPaginationFooter />
    </>
  );
}
