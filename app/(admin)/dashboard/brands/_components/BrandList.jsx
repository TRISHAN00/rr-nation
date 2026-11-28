"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce";
import { deleteAdminBrand, getAdminBrands } from "@/services/admin/admin.brand.service";
import { ChevronLeft, ChevronRight, Edit, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmModal } from "../../_components/ConfirmModal";
import CreateBrandModal from "./CreateBrandModal";
import EditBrandModal from "./EditBrandModal";

export default function BrandList() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [createOpen, setCreateOpen] = useState(false);
  const [editBrand, setEditBrand] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const search = useDebounce(searchInput, 400);
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAdminBrands(page, limit, search);
      setBrands(res?.data?.brands || []);
      setTotalItems(res?.data?.meta?.total || 0);
    } catch (error) {
      console.error(error);
      setBrands([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => { setPage(1); }, [search]);
  useEffect(() => { fetchBrands(); }, [fetchBrands]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteAdminBrand(deleteId);
      toast.success("Brand deleted");
      setDeleteOpen(false);
      setDeleteId(null);
      fetchBrands();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.response?.data?.error || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Brands</h2>
          <p className="text-sm text-muted-foreground">Manage e-commerce brands</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-1.5" /> Create Brand
        </Button>
      </div>

      <div className="relative w-full max-w-sm my-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search brands..."
          className="pl-9 h-10"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <Card className="border-border bg-card shadow-sm overflow-hidden">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">Loading brands...</TableCell>
                </TableRow>
              ) : brands.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No brands found.</TableCell>
                </TableRow>
              ) : (
                brands.map((brand) => (
                  <TableRow key={brand.id}>
                    <TableCell>
                      {brand.logoUrl ? (
                        <img src={brand.logoUrl} alt={brand.name} className="h-10 w-10 rounded-md object-contain bg-muted" />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-muted" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{brand.name}</TableCell>
                    <TableCell className="text-muted-foreground">{brand.slug}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${brand.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                        {brand.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => { setEditBrand(brand); setEditOpen(true); }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => { setDeleteId(brand.id); setDeleteOpen(true); }}>
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
            Total <span className="font-bold text-foreground">{totalItems}</span> brands
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

      <CreateBrandModal open={createOpen} setOpen={setCreateOpen} onRefresh={fetchBrands} />
      <EditBrandModal open={editOpen} setOpen={setEditOpen} brand={editBrand} onRefresh={fetchBrands} />
      <ConfirmModal
        isOpen={deleteOpen}
        onClose={() => { setDeleteOpen(false); setDeleteId(null); }}
        onConfirm={handleDelete}
        title="Delete Brand"
        description="Are you sure you want to delete this brand? This action cannot be undone."
        confirmText={deleting ? "Deleting..." : "Delete"}
        isLoading={deleting}
      />
    </>
  );
}
