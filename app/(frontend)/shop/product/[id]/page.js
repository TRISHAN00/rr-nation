"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/services/product.service";
import { useShopCart } from "@/hooks/useShopCart";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import InnerBanner from "@/app/components/common/InnerBanner";
import { ArrowLeft, Loader2, ShoppingCart, Star, Tag } from "lucide-react";

export default function ProductPage({ params }) {
  const [id, setId] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, loading: cartLoading } = useShopCart();

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await getProductById(id);
        setProduct(res?.data || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="h-96 bg-muted/50 rounded-2xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-6 bg-muted/50 rounded animate-pulse w-1/3" />
            <div className="h-8 bg-muted/50 rounded animate-pulse w-1/2" />
            <div className="h-6 bg-muted/50 rounded animate-pulse w-1/4" />
            <div className="h-24 bg-muted/50 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/shop">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  const hasDiscount = product.salePrice && product.basePrice > product.salePrice;

  return (
    <>
      <InnerBanner
        title={product.name}
        background={product.thumbnailImage || "/dynamic/about/inner-banner.jpg"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />

      <div className="container mx-auto px-4 py-16">
        {/* Main Product */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
          <Image
            src={product.thumbnailImage || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {product.discountPercent > 0 && (
            <Badge className="absolute top-4 left-4 bg-rose-500 text-white border-none text-xs font-bold px-3 py-1">
              -{product.discountPercent}% OFF
            </Badge>
          )}
          {product.isDeal && (
            <Badge className="absolute top-4 right-4 bg-amber-500 text-white border-none text-xs font-bold px-3 py-1">
              DEAL
            </Badge>
          )}
        </div>

        {/* Details */}
        <div>
          {product.category && (
            <Link
              href={`/shop/category/${product.category.slug}`}
              className="text-xs text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1.5 hover:text-brand transition-colors"
            >
              <Tag className="h-3 w-3" /> {product.category.name}
            </Link>
          )}
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">{product.name}</h1>
          {product.sku && (
            <p className="text-xs text-muted-foreground font-mono mb-4">SKU: {product.sku}</p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold text-brand">
              ৳{product.salePrice || product.basePrice}
            </span>
            {hasDiscount && (
              <span className="text-lg text-muted-foreground line-through">
                ৳{product.basePrice}
              </span>
            )}
          </div>

          {/* Rating */}
          {product.reviewSummary && product.reviewSummary.totalReviews > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.round(product.reviewSummary.averageRating) ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.reviewSummary.averageRating.toFixed(1)} ({product.reviewSummary.totalReviews} reviews)
              </span>
            </div>
          )}

          {/* Description */}
          {product.shortDescription && (
            <p className="text-muted-foreground mb-2">{product.shortDescription}</p>
          )}
          {product.description && (
            <p className="text-sm text-muted-foreground mb-6">{product.description}</p>
          )}

          {/* Stock */}
          <div className="flex items-center gap-3 mb-6">
            <Badge variant={product.stockQuantity > 0 ? "default" : "destructive"}>
              {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : "Out of stock"}
            </Badge>
            {product.isFeatured && (
              <Badge className="bg-blue-500 text-white border-none">Featured</Badge>
            )}
          </div>

          {/* Delivery Options */}
          {product.deliveryOptions?.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Delivery Options</p>
              <div className="flex flex-wrap gap-2">
                {product.deliveryOptions.map((opt) => (
                  <Badge key={opt.id} variant="outline">
                    {opt.name} — ৳{opt.baseFee}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <Button
            size="lg"
            className="w-full sm:w-auto"
            disabled={product.stockQuantity <= 0 || cartLoading}
            onClick={() => addToCart(product.id, 1, {
              name: product.name,
              imageUrl: product.images?.[0]?.url || product.thumbnailImage,
              unitPrice: product.salePrice || product.price,
              unitSalePrice: product.salePrice,
            })}
          >
            {cartLoading ? (
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <ShoppingCart className="h-5 w-5 mr-2" />
            )}
            {cartLoading ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>

      {/* Specifications */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold mb-4">Specifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-border pb-2">
                <span className="text-sm text-muted-foreground">{key}</span>
                <span className="text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      {product.latestReviews?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold mb-4">Reviews</h2>
          <div className="space-y-4">
            {product.latestReviews.map((review) => (
              <div key={review.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{review.user?.firstName || "Anonymous"}</span>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Similar Products */}
      {product.similarProducts?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold mb-4">Similar Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.similarProducts.map((item) => (
              <Link
                key={item.id}
                href={`/shop/product/${item.id}`}
                className="group relative rounded-4xl overflow-hidden w-full bg-[#E0F7F6] block transition-all cursor-pointer"
              >
                <div className="event-card-flow" />
                <div className="event-card-shimmer" />
                <div className="relative p-3 flex flex-col z-10">
                  <div className="relative w-full aspect-[20/10] bg-muted rounded-t-4xl overflow-hidden">
                    <Image
                      src={item.thumbnailImage || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="25vw"
                    />
                  </div>
                  <div className="px-4 py-4">
                    <h5 className="text-sm font-bold leading-snug truncate transition-colors duration-300 group-hover:text-white text-dark">
                      {item.name}
                    </h5>
                    <div className="bg-brand h-1 w-8 mt-2 transition-all duration-500 group-hover:bg-white group-hover:w-12"></div>
                    <p className="text-sm font-bold text-dark mt-2 transition-colors duration-300 group-hover:text-white">
                      ৳{item.salePrice || item.basePrice}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      </div>
    </>
  );
}
