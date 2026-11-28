"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProductBySlug } from "@/services/product.service";
import { useShopCart } from "@/hooks/useShopCart";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import InnerBanner from "@/app/components/common/InnerBanner";
import ProductCard from "../../_components/ProductCard";
import {
  ArrowLeft,
  BadgeCheck,
  Loader2,
  Package,
  ShieldCheck,
  ShoppingCart,
  Star,
  Tag,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

const joinValues = (value) =>
  Array.isArray(value) ? value.join(", ") : value || "";

export default function ProductPage({ params }) {
  const router = useRouter();
  const [slug, setSlug] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [carouselApi, setCarouselApi] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const { addToCart, loading: cartLoading } = useShopCart();

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await getProductBySlug(slug);
        const data = res?.data || null;
        setProduct(data);
        if (data) {
          const imgs = [...(data.images || [])].sort(
            (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
          );
          const primaryIdx = imgs.findIndex((img) => img.isPrimary);
          const idx = primaryIdx >= 0 ? primaryIdx : 0;
          setSelectedIndex(idx);
          setSelectedImage(
            imgs[idx]?.imageUrl ||
              imgs[idx]?.full_path ||
              imgs[idx]?.path ||
              data.thumbnailImage ||
              "/placeholder.png",
          );
        }
      } catch (error) {
        console.error(error);
      toast.error(error?.response?.data?.message || error?.response?.data?.error || error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const images = [...(product?.images || [])].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  );

  useEffect(() => {
    if (!carouselApi || !images.length) return;
    const onSelect = () => {
      const idx = carouselApi.selectedScrollSnap();
      setSelectedIndex(idx);
      const img = images[idx];
      const src = img?.imageUrl || img?.full_path || img?.path || img?.url;
      if (src) setSelectedImage(src);
    };
    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi, product?.id]);

  useEffect(() => {
    if (!carouselApi || !images.length) return;
    carouselApi.scrollTo(selectedIndex, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselApi, product?.id]);

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
  const cartProductData = {
    name: product.name,
    imageUrl:
      selectedImage ||
      product.images?.find((img) => img.isPrimary)?.imageUrl ||
      product.images?.[0]?.imageUrl ||
      product.images?.[0]?.url ||
      product.thumbnailImage,
    basePrice: Number(product.basePrice) || Number(product.price) || 0,
    salePrice:
      Number(product.salePrice) > 0 &&
      Number(product.salePrice) < (Number(product.basePrice) || Number(product.price) || 0)
        ? Number(product.salePrice)
        : 0,
  };

  const handleBuyNow = async () => {
    if (product.stockQuantity <= 0 || cartLoading || buyNowLoading) return;
    try {
      setBuyNowLoading(true);
      await addToCart(product.id, 1, cartProductData);
      router.push("/shop/checkout");
    } finally {
      setBuyNowLoading(false);
    }
  };

  const details = [
    ["Brand", product.brand?.name],
    ["Type", product.type],
    ["Product Code", product.productCode],
    ["SKU", product.sku],
    ["Gender", product.gender],
    ["Material", product.material],
    ["Model", product.model],
    ["Medal Type", product.medalType],
    ["Event", product.eventName],
    ["Event Category", product.eventCategory],
    ["Sizes", joinValues(product.sizes)],
    ["Colors", joinValues(product.colors)],
    ["Tags", joinValues(product.tags)],
  ].filter(([, value]) => value !== null && value !== undefined && value !== "");

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

      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Gallery */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start w-full">
            <div className="relative rounded-2xl border border-border/60 bg-white p-2 shadow-sm">
              <Carousel setApi={setCarouselApi} className="w-full" opts={{ loop: images.length > 1 }}>
                <CarouselContent>
                  {(images.length > 0
                    ? images
                    : [{ imageUrl: product.thumbnailImage || "/placeholder.png", id: "fallback" }]
                  ).map((img, i) => {
                    const src =
                      img.imageUrl || img.full_path || img.path || img.url || "/placeholder.png";
                    return (
                      <CarouselItem key={img.id || src || i}>
                        <div className="group relative aspect-square overflow-hidden rounded-xl bg-muted/40">
                          <Image
                            src={src}
                            alt={`${product.name} image ${i + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            priority={i === 0}
                          />
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                {images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-3 h-9 w-9 border-white/80 bg-white/95 shadow-sm backdrop-blur hover:bg-white" />
                    <CarouselNext className="right-3 h-9 w-9 border-white/80 bg-white/95 shadow-sm backdrop-blur hover:bg-white" />
                  </>
                )}
              </Carousel>

              <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                {hasDiscount && (
                  <span className="rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                    -{product.discountPercent || Math.round(((Number(product.basePrice) - Number(product.salePrice)) / Number(product.basePrice)) * 100)}% OFF
                  </span>
                )}
                {product.isDeal && (
                  <span className="rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">Deal</span>
                )}

              </div>
            </div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
                {images.map((img, i) => {
                  const src = img.imageUrl || img.full_path || img.path || img.url;
                  const active = i === selectedIndex;
                  return (
                    <button
                      key={img.id || src || i}
                      type="button"
                      onClick={() => {
                        setSelectedIndex(i);
                        if (src) setSelectedImage(src);
                        carouselApi?.scrollTo(i);
                      }}
                      className={`relative aspect-square overflow-hidden rounded-xl border bg-muted transition-all ${
                        active ? "border-brand ring-2 ring-brand/25" : "border-border/70 hover:border-brand/40"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <Image src={src || "/placeholder.png"} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {product.category && (
                  <Link
                    href={`/shop/category/${product.category.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand hover:bg-brand/15 transition-colors"
                  >
                    <Tag className="h-3.5 w-3.5" /> {product.category.name}
                  </Link>
                )}
                {product.brand?.name && (
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {product.brand.name}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-dark leading-tight">{product.name}</h1>
              {product.shortDescription && (
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">{product.shortDescription}</p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                {product.reviewSummary?.totalReviews > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.round(product.reviewSummary.averageRating) ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                      ))}
                    </div>
                    <span className="text-muted-foreground">
                      {product.reviewSummary.averageRating.toFixed(1)} ({product.reviewSummary.totalReviews} reviews)
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">No reviews yet</span>
                )}
                {product.sku && <span className="text-muted-foreground/60">|</span>}
                {product.sku && <span className="font-mono text-xs text-muted-foreground">SKU: {product.sku}</span>}
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-muted/20 p-5 sm:p-6">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-brand">৳{product.salePrice || product.basePrice}</span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">৳{product.basePrice}</span>
                    <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
                      Save ৳{Number(product.basePrice) - Number(product.salePrice)}
                    </span>
                  </>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${product.stockQuantity > 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                  <Package className="h-3.5 w-3.5" />
                  {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : "Out of stock"}
                </span>
                {product.deliveryOptions?.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                    <Truck className="h-3.5 w-3.5" /> Delivery available
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                  <ShieldCheck className="h-3.5 w-3.5" /> Quality checked
                </span>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-10 w-full sm:w-auto sm:min-w-[180px] rounded-lg bg-dark text-sm font-semibold text-white hover:bg-brand"
                  disabled={product.stockQuantity <= 0 || cartLoading || buyNowLoading}
                  onClick={() => addToCart(product.id, 1, cartProductData)}
                >
                  {cartLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <ShoppingCart className="h-4 w-4 mr-2" />}
                  {cartLoading ? "Adding..." : "Add to Cart"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-10 w-full sm:w-auto sm:min-w-[180px] rounded-lg border-brand text-brand hover:bg-brand hover:text-white"
                  disabled={product.stockQuantity <= 0 || cartLoading || buyNowLoading}
                  onClick={handleBuyNow}
                >
                  {buyNowLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  {buyNowLoading ? "Processing..." : "Buy Now"}
                </Button>
              </div>
            </div>

            {product.deliveryOptions?.length > 0 && (
              <div className="rounded-2xl border border-border/70 bg-white p-5">
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                  <Truck className="h-4 w-4 text-brand" /> Delivery Options
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.deliveryOptions.map((opt) => (
                    <div key={opt.id} className="rounded-lg border border-border/70 bg-muted/20 px-3 py-2 text-sm">
                      <span className="font-medium">{opt.name}</span>
                      <span className="text-muted-foreground"> — ৳{opt.baseFee}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.description && (
              <div className="rounded-2xl border border-border/70 bg-white p-5">
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                  <BadgeCheck className="h-4 w-4 text-brand" /> Description
                </h3>
                <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {details.length > 0 && (
            <div className="lg:col-span-2 rounded-2xl border border-border/70 bg-white p-6">
              <h2 className="text-lg font-bold mb-5">Product Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {details.map(([label, value]) => (
                  <div key={label} className="border-b border-border/60 pb-3">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
                    <p className="text-sm font-medium text-dark">{joinValues(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="rounded-2xl border border-border/70 bg-white p-6">
              <h2 className="text-lg font-bold mb-5">Specifications</h2>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                    <span className="text-sm text-muted-foreground">{key}</span>
                    <span className="text-sm font-medium text-right">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {product.latestReviews?.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">Customer Reviews</h2>
              {product.reviewSummary?.totalReviews > 0 && (
                <span className="text-sm text-muted-foreground">{product.reviewSummary.totalReviews} review(s)</span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.latestReviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-border/70 bg-white p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{review.user?.firstName || "Anonymous"}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.similarProducts?.length > 0 && (
          <div className="mt-14">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-1">You may also like</p>
                <h2 className="text-2xl font-bold">Similar Products</h2>
              </div>
            </div>
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {product.similarProducts.map((item) => (
                  <CarouselItem key={item.id} className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <ProductCard product={item} className="h-full" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:inline-flex -left-4 h-9 w-9 bg-white shadow-sm border-border/70" />
              <CarouselNext className="hidden sm:inline-flex -right-4 h-9 w-9 bg-white shadow-sm border-border/70" />
            </Carousel>
          </div>
        )}
      </div>
    </>
  );
}
