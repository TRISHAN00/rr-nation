"use client";
import { useDashboardMembers } from "../context/MemberContext";
import MemberList from "./_components/MemberList";

export default function DashboardMemberPage() {
  const { members, loading } = useDashboardMembers();

  return (
    <>
      <MemberList members={members} loading={loading} />
    </>
  );
}
