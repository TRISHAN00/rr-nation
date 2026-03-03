"use client";

import { getAllDashboardUsers } from "@/services/admin/admin.user.service";
import { useCallback, useEffect, useState } from "react";
import OrderPagination from "../../_components/module/registrations/_components/OrderPagination";
import UserSearch from "./UserSearch"; // Make sure this path is correct
import UserTable from "./UserTable";

export default function DashboardUsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllDashboardUsers(currentPage, itemsPerPage, searchQuery);
      
      // Safety check for nested data
      const userData = res?.data?.data || res?.data || res; 
      
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

  const handleSearch = (val) => {
    setSearchQuery(val);
    setCurrentPage(1); // Always reset to page 1 on new search
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