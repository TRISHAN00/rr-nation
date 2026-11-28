"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/services/product.service";
import InnerBanner from "@/app/components/common/InnerBanner";
import ProductCard from "../../_components/ProductCard";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export default function CategoryPage({ params }) {
  const [slug, setSlug] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts({ search: slug, limit: 50 });
        const items = res?.data?.products || [];
        setProducts(items);
        if (items.length > 0) {
          setCategoryName(items[0].categoryName || slug);
        } else {
          setCategoryName(slug);
        }
      } catch (error) {
        console.error(error);
      toast.error(error?.response?.data?.message || error?.response?.data?.error || error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  return (
    <>
      <InnerBanner
        title={categoryName || "Category"}
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: categoryName || "Category" },
        ]}
      />

      <div className="container mx-auto px-4 py-16">
        {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border/70 bg-white">
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
        <div className="py-20 text-center text-muted-foreground">
          <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium">No products in this category</p>
          <Link href="/shop" className="text-brand hover:underline text-sm mt-2 inline-block">
            Browse all products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 3} />
          ))}
        </div>
      )}
      </div>
    </>
  );
}
