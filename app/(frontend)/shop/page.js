"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts, getPublicCategories } from "@/services/product.service";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import InnerBanner from "@/app/components/common/InnerBanner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { ChevronLeft, ChevronRight, Search, ShoppingCart } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalItems, setTotalItems] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const search = useDebounce(searchInput, 400);

  const totalPages = Math.ceil(totalItems / limit);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await getPublicCategories();
      setCategories(res?.data || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = { page, limit };
      if (search) params.search = search;
      if (selectedCategory && selectedCategory !== "all") params.categoryId = selectedCategory;
      const res = await getProducts(params);
      setProducts(res?.data?.products || []);
      setTotalItems(res?.data?.meta?.total || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, selectedCategory]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);
  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => { setPage(1); }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Inner Banner */}
      <InnerBanner
        title="Shop"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9 h-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 h-10">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border overflow-hidden">
                <div className="h-56 bg-muted/50 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted/50 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-muted/50 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/shop/product/${product.id}`}
                className="group rounded-2xl border border-border overflow-hidden bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-56 bg-muted overflow-hidden">
                  <Image
                    src={product.thumbnailImage || product.imageUrl || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {product.discountPercent > 0 && (
                    <Badge className="absolute top-3 left-3 bg-rose-500 text-white border-none text-[10px] font-bold">
                      -{product.discountPercent}%
                    </Badge>
                  )}
                  {product.isDeal && (
                    <Badge className="absolute top-3 right-3 bg-amber-500 text-white border-none text-[10px] font-bold">
                      DEAL
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  {product.categoryName && (
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                      {product.categoryName}
                    </p>
                  )}
                  <h3 className="font-semibold text-foreground group-hover:text-brand transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-brand">
                      ৳{product.salePrice || product.basePrice}
                    </span>
                    {product.salePrice && product.basePrice > product.salePrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ৳{product.basePrice}
                      </span>
                    )}
                  </div>
                  {product.stockQuantity !== undefined && (
                    <p className="text-[11px] text-muted-foreground mt-2">
                      {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : "Out of stock"}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <span className="text-sm font-medium">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
