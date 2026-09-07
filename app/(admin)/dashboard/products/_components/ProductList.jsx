"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { ChevronLeft, ChevronRight, Edit, Eye, Search, Trash2 } from "lucide-react";

import { useDebounce } from "@/hooks/useDebounce";
import { deleteProduct, getProducts } from "@/services/admin/admin.product.service";
import { ConfirmModal } from "../../_components/ConfirmModal";
import ProductPageHeader from "./ProductPageHeader";
import ProductDetailSheet from "./ProductDetailSheet";
import EditProductModal from "./EditProductModal";
import StatusDropdown from "./StatusDropdown";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchInput, setSearchInput] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const search = useDebounce(searchInput, 400);

  const totalPages = Math.ceil(totalItems / limit);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteProduct(deleteId);
      setDeleteOpen(false);
      setDeleteId(null);
      fetchProducts();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getProducts(page, limit, search);
      setProducts(res?.data?.products || []);
      setTotalItems(res?.data?.meta?.total || 0);
    } catch (error) {
      console.log(error);
      setProducts([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <ProductPageHeader onRefresh={fetchProducts} />

      <div className="flex items-center gap-2 my-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9 h-10"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-border bg-card shadow-sm overflow-hidden">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Sale Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                    Loading products...
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                  products.map((product) => (
                    <TableRow key={product?.id}>
                      <TableCell>
                        {product?.thumbnailImage ? (
                          <img
                            src={product.thumbnailImage}
                            alt={product?.name || "Product"}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-md bg-muted" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{product?.name}</TableCell>
                      <TableCell>{product?.sku}</TableCell>
                      <TableCell>৳ {product?.basePrice}</TableCell>
                      <TableCell>৳ {product?.salePrice}</TableCell>
                      <TableCell>{product?.stockQuantity}</TableCell>
                      <TableCell>{product?.category?.name || "-"}</TableCell>
                      <TableCell>
                        <StatusDropdown product={product} onRefresh={fetchProducts} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
                              setSheetOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditProduct(product);
                              setEditOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteId(product.id);
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
            Total <span className="font-bold text-foreground">{totalItems}</span> products
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

      <ProductDetailSheet
        isOpen={sheetOpen}
        onOpenChange={setSheetOpen}
        product={selectedProduct}
      />

      <EditProductModal
        open={editOpen}
        setOpen={setEditOpen}
        product={editProduct}
        onRefresh={fetchProducts}
      />

      <ConfirmModal
        isOpen={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteId(null);
        }}
        onConfirm={handleDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText={deleting ? "Deleting..." : "Delete"}
        isLoading={deleting}
      />
    </>
  );
}
