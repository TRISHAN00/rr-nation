"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { ChevronLeft, ChevronRight, Edit, Plus, Trash2 } from "lucide-react";

import {
  deleteDeliveryOption,
  getDeliveryOptions,
} from "@/services/admin/admin.delivery-option.service";
import { ConfirmModal } from "../../_components/ConfirmModal";
import CreateDeliveryOptionModal from "./CreateDeliveryOptionModal";
import EditDeliveryOptionModal from "./EditDeliveryOptionModal";

export default function DeliveryOptionList() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOption, setEditOption] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const totalPages = Math.ceil(totalItems / limit);

  const fetchOptions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getDeliveryOptions(page, limit);
      setOptions(res?.data?.deliveryOptions || []);
      setTotalItems(res?.data?.meta?.total || 0);
    } catch (error) {
      console.log(error);
      setOptions([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteDeliveryOption(deleteId);
      setDeleteOpen(false);
      setDeleteId(null);
      fetchOptions();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Delivery Options</h2>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-1.5" /> Create Delivery Option
        </Button>
      </div>

      <Card className="border-border bg-card shadow-sm overflow-hidden">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    Loading delivery options...
                  </TableCell>
                </TableRow>
              ) : options.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    No delivery options found.
                  </TableCell>
                </TableRow>
              ) : (
                options.map((option) => (
                  <TableRow key={option?.id}>
                    <TableCell>
                      {option?.iconUrl ? (
                        <img
                          src={option.iconUrl}
                          alt={option?.title || "Icon"}
                          className="h-10 w-10 rounded-md object-contain"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-muted" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{option?.title}</TableCell>
                    <TableCell>
                      <span className="px-2 py-0.5 rounded-md bg-muted text-xs font-mono">
                        {option?.code}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {option?.description || "-"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          option?.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {option?.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditOption(option);
                            setEditOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setDeleteId(option.id);
                            setDeleteOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {totalItems > 0 && (
        <div className="flex items-center justify-between px-4 py-4 border rounded-xl bg-card my-4">
          <p className="text-xs text-muted-foreground">
            Total <span className="font-bold text-foreground">{totalItems}</span> delivery options
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <span className="text-xs font-medium">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      <CreateDeliveryOptionModal open={createOpen} setOpen={setCreateOpen} onRefresh={fetchOptions} />

      <EditDeliveryOptionModal
        open={editOpen}
        setOpen={setEditOpen}
        option={editOption}
        onRefresh={fetchOptions}
      />

      <ConfirmModal
        isOpen={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteId(null);
        }}
        onConfirm={handleDelete}
        title="Delete Delivery Option"
        description="Are you sure you want to delete this delivery option? This action cannot be undone."
        confirmText={deleting ? "Deleting..." : "Delete"}
        isLoading={deleting}
      />
    </>
  );
}
