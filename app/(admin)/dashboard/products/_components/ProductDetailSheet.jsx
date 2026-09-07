"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Box,
  Calendar,
  CheckCircle2,
  DollarSign,
  FileText,
  Hash,
  Loader2,
  Package,
  Star,
  Tag,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { getProductById } from "@/services/admin/admin.product.service";

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5 text-sm">
      <Icon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
      <div className="space-y-0.5 w-full min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <p className="font-semibold text-foreground break-words">{value || "—"}</p>
      </div>
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <h4 className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded w-fit mb-2 mt-4">
      {title}
    </h4>
  );
}

function BoolBadge({ value }) {
  return value ? (
    <CheckCircle2 className="h-4 w-4 text-green-600" />
  ) : (
    <XCircle className="h-4 w-4 text-muted-foreground" />
  );
}

export default function ProductDetailSheet({ isOpen, onOpenChange, product }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !product?.id) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getProductById(product.id);
        setDetail(res?.data || null);
      } catch (err) {
        console.error("Failed to fetch product detail:", err);
        setDetail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [isOpen, product?.id]);

  const data = detail || product;
  if (!data) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-full bg-card border-l border-border overflow-y-auto p-0 flex flex-col h-full shadow-2xl">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="relative pt-8 pb-6 px-6 bg-gradient-to-b from-primary/10 to-transparent flex flex-col items-center text-center">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-4 border-background shadow-lg mb-4 bg-muted flex items-center justify-center">
                {data.thumbnailImage ? (
                  <Image
                    src={data.thumbnailImage}
                    alt={data.name || "Product"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Package className="h-12 w-12 text-muted-foreground" />
                )}
              </div>

              <SheetHeader className="space-y-1 w-full">
                <SheetTitle className="text-xl font-extrabold tracking-tight text-foreground">
                  {data.name}
                </SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground">
                  {data.shortDescription}
                </SheetDescription>
              </SheetHeader>

              <div className="flex gap-2 mt-3">
                <Badge
                  variant={
                    data.approvalStatus === "APPROVED"
                      ? "default"
                      : data.approvalStatus === "REJECTED"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {data.approvalStatus}
                </Badge>
                {data.isActive ? (
                  <Badge variant="outline" className="text-green-600 border-green-300">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    Inactive
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {/* Pricing */}
              <SectionTitle>Pricing</SectionTitle>
              <div className="grid grid-cols-2 gap-x-4">
                <DetailRow
                  icon={DollarSign}
                  label="Base Price"
                  value={`৳ ${data.basePrice}`}
                />
                <DetailRow
                  icon={DollarSign}
                  label="Sale Price"
                  value={`৳ ${data.salePrice}`}
                />
                <DetailRow
                  icon={Tag}
                  label="Discount"
                  value={`${data.discountPercent}%`}
                />
                <DetailRow
                  icon={Package}
                  label="Stock"
                  value={data.stockQuantity}
                />
              </div>

              <Separator className="my-2" />

              {/* Product Info */}
              <SectionTitle>Product Info</SectionTitle>
              <div className="space-y-0">
                <DetailRow icon={Hash} label="SKU" value={data.sku} />
                <DetailRow icon={Box} label="Slug" value={data.slug} />
                <DetailRow
                  icon={Star}
                  label="Brand"
                  value={data.brand?.name}
                />
                <DetailRow
                  icon={FileText}
                  label="Category"
                  value={data.category?.name}
                />
              </div>

              <Separator className="my-2" />

              {/* Flags */}
              <SectionTitle>Flags</SectionTitle>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Has Variant", value: data.hasVariant },
                  { label: "Featured", value: data.isFeatured },
                  { label: "Deal", value: data.isDeal },
                  { label: "Archived", value: data.isArchived },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <BoolBadge value={value} />
                  </div>
                ))}
              </div>

              <Separator className="my-2" />

              {/* Description */}
              <SectionTitle>Description</SectionTitle>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {data.description || "—"}
              </p>

              {/* Images */}
              {data.images?.length > 0 && (
                <>
                  <SectionTitle>Images ({data.images.length})</SectionTitle>
                  <div className="flex flex-wrap gap-2">
                    {data.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-16 h-16 rounded-lg overflow-hidden border bg-muted"
                      >
                        <Image
                          src={img.full_path || img.path}
                          alt={img.img_alt || `Image ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Specifications */}
              {data.specifications?.length > 0 && (
                <>
                  <SectionTitle>Specifications</SectionTitle>
                  <div className="space-y-1">
                    {data.specifications.map((s, i) => (
                      <div key={i} className="flex justify-between text-sm py-1 border-b last:border-0">
                        <span className="text-muted-foreground">{s.key || s.label}</span>
                        <span className="font-medium">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Timestamps */}
              <SectionTitle>Timestamps</SectionTitle>
              <div className="space-y-0">
                <DetailRow
                  icon={Calendar}
                  label="Created"
                  value={new Date(data.createdAt).toLocaleString()}
                />
                <DetailRow
                  icon={Calendar}
                  label="Updated"
                  value={new Date(data.updatedAt).toLocaleString()}
                />
                {data.approvedAt && (
                  <DetailRow
                    icon={Calendar}
                    label="Approved"
                    value={new Date(data.approvedAt).toLocaleString()}
                  />
                )}
                {data.rejectedAt && (
                  <DetailRow
                    icon={Calendar}
                    label="Rejected"
                    value={new Date(data.rejectedAt).toLocaleString()}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
