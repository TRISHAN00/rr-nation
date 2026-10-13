"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/services/product.service";
import { Badge } from "@/app/components/ui/badge";
import InnerBanner from "@/app/components/common/InnerBanner";
import { ArrowLeft, ShoppingCart, Tag } from "lucide-react";

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
            <div key={i} className="rounded-2xl border border-border overflow-hidden">
              <div className="h-48 bg-muted/50 animate-pulse" />
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
          <p className="text-lg font-medium">No products in this category</p>
          <Link href="/shop" className="text-brand hover:underline text-sm mt-2 inline-block">
            Browse all products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
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
                </div>

                {/* Content */}
                <div className="px-5 sm:px-6 py-5 flex flex-col gap-4">
                  <div className="overflow-hidden relative">
                    <h5 className="text-dark text-md sm:text-xl lg:text-1xl font-bold leading-snug truncate transition-colors duration-300 group-hover:text-white">
                      {product.name}
                    </h5>
                  </div>

                  <div className="bg-brand h-1 w-12 transition-all duration-500 group-hover:bg-white group-hover:w-20"></div>

                  <div className="flex items-start gap-4 sm:gap-6">
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

                    <div className="flex items-center gap-2 flex-1 pt-2">
                      <Tag className="text-gray transition-colors duration-300 shrink-0 group-hover:text-white" />
                      <p className="text-gray text-sm sm:text-[16px] font-medium transition-colors duration-300 line-clamp-2 group-hover:text-white">
                        {product.categoryName || "Uncategorized"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      </div>
    </>
  );
}
