"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { getProducts, getPublicCategories } from "@/services/product.service";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "./_components/ProductCard";

const PAGE_SIZE = 12;
// The products endpoint filters by a single category at a time, so when
// several categories are selected we fetch each one and merge the results.
const CATEGORY_FETCH_LIMIT = 100;
const MAX_CATEGORY_PAGES = 10;
const CATEGORY_PREVIEW_COUNT = 6;

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [sidebarElevated, setSidebarElevated] = useState(false);
  const search = useDebounce(searchInput, 400);

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const activeFilterCount = selectedCategories.length + (searchInput ? 1 : 0);
  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, CATEGORY_PREVIEW_COUNT);

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

      if (selectedCategories.length === 0) {
        const params = { page, limit: PAGE_SIZE };
        if (search) params.search = search;
        const res = await getProducts(params);
        setProducts(res?.data?.products || []);
        setTotalItems(res?.data?.meta?.total || 0);
        return;
      }

      // Fetch every selected category and merge them into one unique list.
      const categoryItems = await Promise.all(
        selectedCategories.map(async (categoryId) => {
          const params = { page: 1, limit: CATEGORY_FETCH_LIMIT, categoryId };
          if (search) params.search = search;

          const first = await getProducts(params);
          const items = [...(first?.data?.products || [])];
          const pages = Math.min(
            first?.data?.meta?.totalPages || 1,
            MAX_CATEGORY_PAGES,
          );

          for (let nextPage = 2; nextPage <= pages; nextPage++) {
            const res = await getProducts({ ...params, page: nextPage });
            items.push(...(res?.data?.products || []));
          }

          return items;
        }),
      );

      const merged = new Map();
      categoryItems.flat().forEach((product) => merged.set(product.id, product));
      const allProducts = Array.from(merged.values());

      setTotalItems(allProducts.length);
      setProducts(allProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
    } catch (error) {
      console.error(error);
      setProducts([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [page, search, selectedCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setPage(1);
  }, [search, selectedCategories]);

  // Subtle elevation once the page scrolls, so the sticky panel reads as floating.
  useEffect(() => {
    const onScroll = () => setSidebarElevated(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchInput("");
  };

  const filters = (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray">
          Search
        </h3>
        <div className="group relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray transition-colors group-focus-within:text-brand" />
          <Input
            aria-label="Search products"
            placeholder="Search products..."
            className="h-10 bg-neutral-50/70 pl-9 pr-9 transition-colors focus-visible:bg-white"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchInput("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray transition-colors hover:bg-neutral-100 hover:text-dark"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray">
            Categories
          </h3>
          {selectedCategories.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedCategories([])}
              className="text-xs font-medium text-brand transition-opacity hover:opacity-80"
            >
              Clear
            </button>
          )}
        </div>

        {categories.length === 0 ? (
          <p className="text-sm text-gray">Loading categories...</p>
        ) : (
          <div className="space-y-1">
            {visibleCategories.map((category) => {
              const id = String(category.id);
              const checked = selectedCategories.includes(id);
              return (
                <label
                  key={category.id}
                  className={cn(
                    "group/cat flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-all duration-200",
                    "focus-within:ring-2 focus-within:ring-brand/25",
                    checked
                      ? "bg-brand/[0.08] text-dark"
                      : "text-dark hover:bg-neutral-50",
                  )}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggleCategory(id)}
                  />
                  <span
                    className={cn(
                      "grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] border transition-all duration-200",
                      checked
                        ? "border-brand bg-brand text-white shadow-sm shadow-brand/30"
                        : "border-neutral-300 bg-white text-transparent group-hover/cat:border-brand/50",
                    )}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span
                    className={cn(
                      "flex-1 truncate transition-colors",
                      checked && "font-medium",
                    )}
                  >
                    {category.name}
                  </span>
                </label>
              );
            })}

            {categories.length > CATEGORY_PREVIEW_COUNT && (
              <button
                type="button"
                onClick={() => setShowAllCategories((value) => !value)}
                className="mt-1 flex w-full items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium text-brand transition-colors hover:bg-brand/5"
              >
                {showAllCategories
                  ? "Show less"
                  : `Show all ${categories.length}`}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    showAllCategories && "rotate-180",
                  )}
                />
              </button>
            )}
          </div>
        )}
      </div>

      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          className="w-full border-brand/30 text-brand hover:bg-brand/5 hover:text-brand"
          onClick={clearFilters}
        >
          <X className="mr-2 h-4 w-4" /> Clear all filters
        </Button>
      )}
    </div>
  );

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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Left sidebar (desktop) — sticky while the product grid scrolls */}
          <aside className="hidden lg:block">
            <div
              className={cn(
                "sticky top-28 overflow-hidden rounded-2xl border bg-white transition-shadow duration-300",
                sidebarElevated
                  ? "border-border shadow-xl shadow-black/5"
                  : "border-border/70 shadow-sm",
              )}
            >
              <div className="flex items-center justify-between border-b border-border/70 bg-gradient-to-r from-brand/[0.08] via-brand/[0.03] to-transparent px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand/10 text-brand">
                    <SlidersHorizontal className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-dark">Filters</p>
                    <p className="text-[11px] text-gray">
                      {activeFilterCount > 0
                        ? `${activeFilterCount} active`
                        : "Refine your search"}
                    </p>
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-brand transition-colors hover:bg-brand/10"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="custom-scrollbar max-h-[calc(100vh-12rem)] overflow-y-auto p-5">
                {filters}
              </div>
            </div>
          </aside>

          {/* Mobile filter drawer */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setFiltersOpen(false)}
              />
              <div className="absolute left-0 top-0 flex h-full w-[85%] max-w-xs flex-col bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <div>
                    <span className="text-base font-semibold text-dark">
                      Filters
                    </span>
                    {activeFilterCount > 0 && (
                      <p className="text-[11px] text-gray">
                        {activeFilterCount} active
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label="Close filters"
                    onClick={() => setFiltersOpen(false)}
                    className="rounded p-1 text-gray transition-colors hover:text-dark"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="custom-scrollbar flex-1 overflow-y-auto p-5">
                  {filters}
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-dark">Products</h2>
                <p className="text-sm text-gray">
                  {loading
                    ? "Loading products..."
                    : `${totalItems} product${totalItems === 1 ? "" : "s"} found`}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setFiltersOpen(true)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {selectedCategories.length > 0 && (
                  <span className="ml-2 rounded-full bg-brand px-1.5 text-[11px] font-semibold text-white">
                    {selectedCategories.length}
                  </span>
                )}
              </Button>
            </div>

            {/* Active category chips */}
            {selectedCategories.length > 0 && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {selectedCategories.map((id) => {
                  const category = categories.find(
                    (item) => String(item.id) === id,
                  );
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleCategory(id)}
                      className="flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand transition-colors hover:bg-brand/15"
                    >
                      {category?.name || "Category"}
                      <X className="h-3 w-3" />
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setSelectedCategories([])}
                  className="text-xs font-medium text-gray underline-offset-2 hover:text-dark hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-border/70 bg-white"
                  >
                    <div className="aspect-square w-full animate-pulse bg-neutral-100" />
                    <div className="space-y-3 p-4">
                      <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                      <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                      <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                      <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
                <ShoppingCart className="mx-auto mb-4 h-12 w-12 opacity-40" />
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm">
                  Try a different search or clear some category filters.
                </p>
                {(selectedCategories.length > 0 || searchInput) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < 3}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" /> Prev
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
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
