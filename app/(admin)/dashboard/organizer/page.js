"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { getAllDashboardOrganizers, updateOrganizerStatus } from "@/services/admin/admin.organizer";
import { useDebounce } from "@/hooks/useDebounce";
import OrderHeader from "../_components/module/registrations/_components/OrderHeader";
import { ConfirmModal } from "../_components/ConfirmModal";
import OrganizerActions from "./_components/OrganizerActions";
import OrgList from "./_components/OrgList";
import OrganizerDetailSheet from "./_components/OrganizerDetailSheet";

export default function DashboardOrganizerPage() {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [adminApproval, setAdminApproval] = useState("all");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [nextStatus, setNextStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const debouncedSearch = useDebounce(search, 300);

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllDashboardOrganizers(
        page,
        limit,
        adminApproval === "all" ? undefined : adminApproval,
      );
      const data = res?.data || {};
      const items = data.items || data.organizers || [];
      setOrganizers(Array.isArray(items) ? items : []);
      setTotalItems(Number(data.total) || 0);
    } catch (error) {
      console.error("Error fetching organizers:", error);
      toast.error(error?.response?.data?.message || error?.response?.data?.error || "Failed to load organizers");
      setOrganizers([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [page, limit, adminApproval]);

  useEffect(() => {
    setPage(1);
  }, [adminApproval]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredOrganizers = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return organizers;
    return organizers.filter((o) =>
      [o.organizationName, o.primaryRepresentative, o.officialEmail, o.registrationNumber]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [organizers, debouncedSearch]);

  const handleAction = (item, status) => {
    setSelected(item);
    setNextStatus(status);
    setConfirmOpen(true);
  };

  const handleView = (item) => {
    setDetailItem(item);
    setDetailOpen(true);
  };

  const handleConfirm = async () => {
    if (!selected?.id || !nextStatus) return;
    const currentStatus = String(selected?.adminApproval || "pending").toLowerCase();
    if (currentStatus === nextStatus) {
      toast.info(`Organizer is already ${nextStatus}`);
      setConfirmOpen(false);
      return;
    }

    try {
      setUpdating(true);
      await updateOrganizerStatus({ organizerId: selected.id, adminApproval: nextStatus });
      toast.success(
        nextStatus === "approved"
          ? "Organizer approved successfully"
          : "Organizer rejected successfully",
      );
      setConfirmOpen(false);
      setSelected(null);
      setNextStatus("");
      fetchData();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to update organizer status",
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <OrderHeader
        title="Organizer Registration History"
        desc="Review organizer registrations and approval status."
      />

      <OrganizerActions
        search={search}
        onSearchChange={setSearch}
        adminApproval={adminApproval}
        onAdminApprovalChange={setAdminApproval}
      />

      <OrgList data={filteredOrganizers} loading={loading} onAction={handleAction} onView={handleView} />

      {totalItems > 0 && (
        <div className="flex items-center justify-between px-4 py-4 border rounded-xl bg-card">
          <p className="text-xs text-muted-foreground">
            Total <span className="font-bold text-foreground">{totalItems}</span> organizers
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <span className="text-xs font-medium">Page {page} of {totalPages}</span>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      <OrganizerDetailSheet
        isOpen={detailOpen}
        onOpenChange={(open) => {
          setDetailOpen(open);
          if (!open) setDetailItem(null);
        }}
        organizer={detailItem}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => {
          if (updating) return;
          setConfirmOpen(false);
          setSelected(null);
          setNextStatus("");
        }}
        onConfirm={handleConfirm}
        title={nextStatus === "approved" ? "Approve Organizer" : "Reject Organizer"}
        description={
          nextStatus === "approved"
            ? `Approve ${selected?.organizationName || "this organizer"}? They will gain access to the organizer dashboard.`
            : `Reject ${selected?.organizationName || "this organizer"}? They will not be able to access the organizer dashboard.`
        }
        confirmText={
          updating
            ? nextStatus === "approved"
              ? "Approving..."
              : "Rejecting..."
            : nextStatus === "approved"
              ? "Approve Organizer"
              : "Reject Organizer"
        }
        isLoading={updating}
      />
    </div>
  );
}