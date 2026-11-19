"use client";

import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product, priority = false, className = "" }) {
  const basePrice = Number(product.basePrice) || 0;
  const salePrice = Number(product.salePrice) || 0;
  const displayPrice = salePrice || basePrice || Number(product.price) || 0;
  const hasDiscount = salePrice > 0 && basePrice > salePrice;
  const discountPercent = product.discountPercent > 0
    ? product.discountPercent
    : hasDiscount
      ? Math.round(((basePrice - salePrice) / basePrice) * 100)
      : 0;
  const inStock =
    product.stockQuantity == null ? true : Number(product.stockQuantity) > 0;

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-white transition-all duration-300",
        "hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-black/5",
        className,
      )}
    >
      {/* Image */}
      <Link
        href={`/shop/product/${product.slug || product.id}`}
        className="relative block overflow-hidden bg-neutral-100"
        aria-label={product.name}
      >
        <div className="relative aspect-square w-full">
          <Image
            src={product.thumbnailImage || product.imageUrl || "/placeholder.png"}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        {/* Badges */}
        {(discountPercent > 0 || product.isDeal) && (
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            {discountPercent > 0 ? (
              <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
                -{discountPercent}% Off
              </span>
            ) : (
              <span />
            )}
            {product.isDeal && (
              <span className="rounded-full bg-dark px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
                Deal
              </span>
            )}
          </div>
        )}

        {/* Out of stock */}
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/65 backdrop-blur-[2px]">
            <span className="rounded-full bg-dark px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1.5 truncate text-[11px] font-semibold uppercase tracking-wider text-brand">
          {product.categoryName || "Uncategorized"}
        </p>

        <Link href={`/shop/product/${product.slug || product.id}`} className="outline-none">
          <h3 className="line-clamp-2 min-h-10 text-[15px] font-semibold leading-5 text-dark transition-colors duration-200 group-hover:text-brand">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-end gap-2 pt-4">
          <span className="text-lg font-bold leading-none text-dark">৳{displayPrice}</span>
          {hasDiscount && (
            <span className="text-sm font-medium leading-none text-gray line-through">
              ৳{basePrice}
            </span>
          )}
        </div>

        <div className="mt-3">
          {inStock ? (
            <AddToCartButton
              productId={product.id}
              stockQuantity={product.stockQuantity}
              productData={{
                name: product.name,
                imageUrl: product.thumbnailImage || product.imageUrl,
                unitPrice: salePrice || Number(product.price) || basePrice,
                unitSalePrice: salePrice || undefined,
              }}
              className="h-10 w-full rounded-lg bg-dark text-sm font-semibold text-white hover:bg-brand"
            />
          ) : (
            <Button
              disabled
              className="h-10 w-full rounded-lg bg-neutral-100 text-sm font-semibold text-neutral-400 hover:bg-neutral-100"
            >
              Out of Stock
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
