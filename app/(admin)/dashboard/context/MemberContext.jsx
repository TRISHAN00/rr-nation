"use client";
import { getAllDashboardMembers } from "@/services/admin/admin.member.service";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

const MemberContext = createContext(null);

export default function MemberProvider({ children }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [totalItems, setTotalItems] = useState(0); // Added to track total for pagination
  const [adminApproval, setAdminApproval] = useState("");
  const [memberType, setMemberType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(""); // Added

  const fetchMembers = useCallback(async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!token) return;

    try {
      setLoading(true);
      const response = await getAllDashboardMembers(
        page,
        limit,
        adminApproval,
        memberType,
        paymentStatus,
        search,
      );

      // Adjust these keys based on your actual API response structure
      setMembers(response?.data?.items || response?.items || []);
      setTotalItems(response?.data?.total || response?.total || 0);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to fetch members");
    } finally {
      setLoading(false);
    }
  }, [page, limit, adminApproval, memberType, paymentStatus, search]);

  const updateMember = async (memberId, newStatus, currentType) => {
    try {
      const payload = {
        memberId,
        adminApproval: newStatus,
        memberType: currentType,
      };
      await updateMemberStatus(payload);
      toast.success(`Member ${newStatus} successfully`);
      fetchMembers(); // Refresh list after update
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      return { success: false };
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return (
    <MemberContext.Provider
      value={{
        members,
        loading,
        page,
        setPage,
        limit,
        totalItems,
        setAdminApproval,
        setMemberType,
        setPaymentStatus,
        setSearch,
        updateMember
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}

export const useDashboardMembers = () => {
  const context = useContext(MemberContext);
  if (!context)
    throw new Error("useDashboardMembers must be used inside MemberProvider");
  return context;
};
