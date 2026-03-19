"use client";
import OrderHeader from "../_components/module/registrations/_components/OrderHeader";
import { useDashboardMembers } from "../context/MemberContext";
import MemberActions from "./_components/MemberActions";
import MemberList from "./_components/MemberList";

export default function DashboardMemberPage() {
  const { members, loading } = useDashboardMembers();

  return (
    <>
      <OrderHeader title="Member Order Histry" />
      <MemberActions/>
      <MemberList members={members} loading={loading} />
    </>
  );
}
