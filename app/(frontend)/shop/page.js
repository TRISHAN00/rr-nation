"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import { Button } from "@/app/components/ui/button";
import AddToCartButton from "./_components/AddToCartButton";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { getProducts, getPublicCategories } from "@/services/product.service";
import { ChevronLeft, ChevronRight, Search, ShoppingCart, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/shop/product/${product.id}`}
                className="group relative rounded-4xl overflow-hidden w-full bg-[#E0F7F6] block transition-all cursor-pointer"
              >
                {/* 🌊 Flow Background Layer */}
                <div className="event-card-flow" />

                {/* ✨ Shimmer Sweep Layer */}
                <div className="event-card-shimmer" />

                <div className="relative p-4 flex flex-col z-10">
                  {/* Image */}
                  <div className="relative w-full aspect-[20/10] bg-muted rounded-t-4xl overflow-hidden">
                    <Image
                      src={product.thumbnailImage || product.imageUrl || "/placeholder.png"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Discount Badge */}
                    {product.discountPercent > 0 && (
                      <div className="absolute top-3 left-3 z-30">
                        <span className="flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md bg-brand text-white text-[10px] font-bold tracking-widest shadow-lg">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                          -{product.discountPercent}% OFF
                        </span>
                      </div>
                    )}
                    {/* Deal Badge */}
                    {product.isDeal && (
                      <div className="absolute top-3 right-3 z-30">
                        <span className="flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md bg-amber-400 text-white text-[10px] font-bold tracking-widest shadow-lg">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                          DEAL
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="px-5 sm:px-6 py-5 flex flex-col gap-4">
                    {/* Title */}
                    <div className="overflow-hidden relative">
                      <h5 className="text-dark text-md sm:text-xl lg:text-1xl font-bold leading-snug truncate transition-colors duration-300 group-hover:text-white">
                        {product.name}
                      </h5>
                    </div>

                    {/* Brand Bar */}
                    <div className="bg-brand h-1 w-12 transition-all duration-500 group-hover:bg-white group-hover:w-20"></div>

                    <div className="flex items-start gap-4 sm:gap-6">
                      {/* Price Box (replaces Date Box) */}
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0">
                        <span className="absolute inset-0 bg-brand scale-y-0 origin-top transition-transform duration-500 ease-out group-hover:scale-y-100 z-0" />
                        <div className="relative z-10 bg-[#090909] h-full w-full flex flex-col items-center justify-center transition-colors duration-300 group-hover:bg-transparent">
                          <h4 className="text-[20px] font-bold text-white leading-none">
                            ৳{product.salePrice || product.basePrice}
                          </h4>
                          {product.salePrice && product.basePrice > product.salePrice && (
                            <span className="text-white/70 text-[10px] font-medium line-through mt-0.5">
                              ৳{product.basePrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Category */}
                      <div className="flex items-center gap-2 flex-1 pt-2">
                        <Tag className="text-gray transition-colors duration-300 shrink-0 group-hover:text-white" />
                        <p className="text-gray text-sm sm:text-[16px] font-medium transition-colors duration-300 line-clamp-2 group-hover:text-white">
                          {product.categoryName || "Uncategorized"}
                        </p>
                      </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="mt-2">
                      <AddToCartButton
                        productId={product.id}
                        stockQuantity={product.stockQuantity}
                        productData={{
                          name: product.name,
                          imageUrl: product.thumbnailImage || product.imageUrl,
                          unitPrice: product.salePrice || product.price,
                          unitSalePrice: product.salePrice,
                        }}
                        className="w-full bg-brand hover:bg-brand/90 text-white rounded-xl h-10 text-sm font-semibold"
                      />
                    </div>
                  </div>
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
