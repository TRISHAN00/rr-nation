"use client";
import { getAllDashboardMembers } from "@/services/admin/admin.member.service";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const MemberContext = createContext(null);

export default function MemberProvider({children}) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [adminApproval, setAdminApproval] = useState("pending");
  const [eventType, setEventType] = useState("");


  const fetchMembers = useCallback(async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!token) return;

    try {
      setLoading(true);
      const formattedDateForAPI =
        date instanceof Date ? format(date, "MM/dd/yyyy") : "";
      const encodedDate = encodeURIComponent(formattedDateForAPI);

      const response = await getAllDashboardMembers(
        page,
        limit,
        adminApproval,
        search,
        eventType === "all" ? "" : eventType,
        encodedDate,
      );

      setMembers(response?.data?.items || response?.items || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, [page, limit, adminApproval, search, eventType, date]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return <MemberContext.Provider
      value={{
        members,
        loading
      }}
    >
      {children}
    </MemberContext.Provider>;
}

export const useDashboardMembers = () => {
  const context = useContext(MemberContext);
  if (!context)
    throw new Error("useDashboardMembers must be used inside MemberProvider");
  return context;
};
