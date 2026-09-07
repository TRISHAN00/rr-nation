"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { updateProductStatus } from "@/services/admin/admin.product.service";
import { ChevronDown, Loader2 } from "lucide-react";

const statuses = [
  { value: "APPROVED", label: "Approved", color: "bg-green-100 text-green-700" },
  { value: "DRAFT", label: "Draft", color: "bg-gray-100 text-gray-700" },
];

export default function StatusDropdown({ product, onRefresh }) {
  const [loading, setLoading] = useState(false);

  const currentStatus = statuses.find((s) => s.value === product?.approvalStatus) || statuses[1];

  const handleStatusChange = async (newStatus) => {
    if (newStatus === product?.approvalStatus) return;

    try {
      setLoading(true);
      await updateProductStatus(product.id, {
        approvalStatus: newStatus,
      });
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Status update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity ${currentStatus.color}`}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            currentStatus.label
          )}
          <ChevronDown className="h-3 w-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statuses.map((status) => (
          <DropdownMenuItem
            key={status.value}
            onClick={() => handleStatusChange(status.value)}
            className="flex items-center gap-2"
          >
            <span className={`w-2 h-2 rounded-full ${status.color.split(" ")[0]}`} />
            {status.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
