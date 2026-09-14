"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/services/product.service";
import { Badge } from "@/app/components/ui/badge";
import { ArrowLeft, ShoppingCart } from "lucide-react";

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
    <div className="container mx-auto px-4 py-24">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <h1 className="text-3xl font-extrabold tracking-tight mb-2">{categoryName}</h1>
      <p className="text-muted-foreground mb-8">Products in this category.</p>

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
              className="group rounded-2xl border border-border overflow-hidden bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 bg-muted overflow-hidden">
                <Image
                  src={product.thumbnailImage || product.imageUrl || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {product.discountPercent > 0 && (
                  <Badge className="absolute top-3 left-3 bg-rose-500 text-white border-none text-[10px] font-bold">
                    -{product.discountPercent}%
                  </Badge>
                )}
              </div>
              <div className="p-4">
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
