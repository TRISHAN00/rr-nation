"use client";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { Textarea } from "@/app/components/ui/textarea";
import MultiValueInput from "./MultiValueInput";

export default function ProductFormFields({
  form,
  handleChange,
  categories = [],
  brands = [],
  includeActive = false,
}) {
  const toggles = [
    { key: "hasVariant", label: "Has Variant" },
    { key: "isDeal", label: "Deal" },
    { key: "isFeatured", label: "Featured" },
    ...(includeActive ? [{ key: "isActive", label: "Active" }] : []),
  ];

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <Label>Name</Label>
          <Input
            placeholder="Chocolate Cake"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Slug</Label>
          <Input
            placeholder="chocolate-cake"
            value={form.slug}
            readOnly
            className="bg-muted/50"
          />
        </div>
        <div className="space-y-1">
          <Label>SKU</Label>
          <Input
            placeholder="CAKE-001"
            value={form.sku}
            onChange={(e) => handleChange("sku", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Product Code</Label>
          <Input
            placeholder="PRD-000001"
            value={form.productCode}
            onChange={(e) => handleChange("productCode", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Category</Label>
          <Select
            value={form.categoryId || undefined}
            onValueChange={(value) => handleChange("categoryId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Brand</Label>
          <Select
            value={form.brandId || undefined}
            onValueChange={(value) => handleChange("brandId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={String(brand.id)}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Type</Label>
          <Input
            placeholder="T-Shirt"
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-1">
          <Label>Base Price (৳)</Label>
          <Input
            type="number"
            placeholder="1200"
            value={form.basePrice}
            onChange={(e) => handleChange("basePrice", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Sale Price (৳)</Label>
          <Input
            type="number"
            placeholder="1000"
            value={form.salePrice}
            onChange={(e) => handleChange("salePrice", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Discount (%)</Label>
          <Input
            type="number"
            placeholder="16.67"
            value={form.discountPercent}
            onChange={(e) => handleChange("discountPercent", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Stock Quantity</Label>
          <Input
            type="number"
            placeholder="20"
            value={form.stockQuantity}
            onChange={(e) => handleChange("stockQuantity", e.target.value)}
          />
        </div>
      </div>

      {/* Product attributes */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <Label>Event Name</Label>
          <Input
            placeholder="City Marathon 2026"
            value={form.eventName}
            onChange={(e) => handleChange("eventName", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Event Category</Label>
          <Input
            placeholder="Full Marathon"
            value={form.eventCategory}
            onChange={(e) => handleChange("eventCategory", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Medal Type</Label>
          <Input
            placeholder="Gold-plated metal"
            value={form.medalType}
            onChange={(e) => handleChange("medalType", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Model</Label>
          <Input
            placeholder="Marlin 5"
            value={form.model}
            onChange={(e) => handleChange("model", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Material</Label>
          <Input
            placeholder="Polyester"
            value={form.material}
            onChange={(e) => handleChange("material", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Gender</Label>
          <Input
            placeholder="Unisex"
            value={form.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
          />
        </div>
      </div>

      {/* Multi-value fields */}
      <div className="grid gap-4 md:grid-cols-3">
        <MultiValueInput
          label="Colors"
          placeholder="Red,Navy Blue"
          value={form.colors}
          onChange={(value) => handleChange("colors", value)}
        />
        <MultiValueInput
          label="Sizes"
          placeholder="S,M,L,XL"
          value={form.sizes}
          onChange={(value) => handleChange("sizes", value)}
        />
        <MultiValueInput
          label="Tags"
          placeholder="running,marathon"
          value={form.tags}
          onChange={(value) => handleChange("tags", value)}
        />
      </div>

      {/* Descriptions */}
      <div className="space-y-4">
        <div className="space-y-1">
          <Label>Short Description</Label>
          <Input
            placeholder="Fresh chocolate cake"
            value={form.shortDescription}
            onChange={(e) => handleChange("shortDescription", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Description</Label>
          <Textarea
            rows={4}
            placeholder="Premium chocolate cake."
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
      </div>

      {/* Toggles */}
      <div
        className={`grid gap-4 ${
          includeActive ? "md:grid-cols-4" : "md:grid-cols-3"
        }`}
      >
        {toggles.map(({ key, label }) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-lg border border-border p-3"
          >
            <Label className="mb-0">{label}</Label>
            <Switch
              checked={Boolean(form[key])}
              onCheckedChange={(value) => handleChange(key, value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
