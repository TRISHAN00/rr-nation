"use client";

import { getAllDashboardUsers } from "@/services/admin/admin.user.service";
import { useCallback, useEffect, useState } from "react";
import OrderPagination from "../registrations/_components/OrderPagination"; // Reusing your pagination
import UserSearch from "./_components/UserSearch";
import UserTable from "./_components/UserTable";

export default function DashboardUsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  
  // Filtering & Pagination State
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      // Matching your API signature: (page, limit, search)
      const res = await getAllDashboardUsers(currentPage, itemsPerPage, searchQuery);
      
      // Drilling into your specific data structure: res.data.data.items
      const userData = res?.data?.data; 
      
      setUsers(userData?.items || []);
      setTotalPages(userData?.totalPages || 1);
      setTotalCount(userData?.count || 0);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset to page 1 when searching
  const handleSearch = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Users</h1>
          <p className="text-muted-foreground text-sm">
            Managing {totalCount} registered accounts.
          </p>
        </div>
      </div>

      <UserSearch searchQuery={searchQuery} setSearchQuery={handleSearch} />

      <UserTable users={users} loading={loading} />

      {!loading && users.length > 0 && (
        <OrderPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}