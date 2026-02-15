"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Plus, Shirt, Trash2 } from "lucide-react";
import { useState } from "react";

const sizeCategories = [
  { id: "tshirt", label: "T-Shirt (Adult)", fields: ["chest", "length"] },
  { id: "kids", label: "Kids", fields: ["chest", "length"] },
];

const defaultSizes = {
  tshirt: [
    { id: 1, name: "XS", chest: "34", length: "26" },
    { id: 2, name: "S", chest: "36", length: "27" },
    { id: 3, name: "M", chest: "38", length: "28" },
    { id: 4, name: "L", chest: "40", length: "29" },
    { id: 5, name: "XL", chest: "42", length: "30" },
    { id: 6, name: "XXL", chest: "44", length: "31" },
  ],
  kids: [
    { id: 1, name: "3-4Y", chest: "24", length: "16" },
    { id: 2, name: "5-6Y", chest: "26", length: "18" },
    { id: 3, name: "7-8Y", chest: "28", length: "20" },
    { id: 4, name: "9-10Y", chest: "30", length: "22" },
    { id: 5, name: "11-12Y", chest: "32", length: "24" },
  ],
};

export function TShirtSizeManager({ value, onChange }) {
  const [sizes, setSizes] = useState(value?.sizes || defaultSizes);
  const [settings, setSettings] = useState(
    value?.settings || {
      enabled: false,
      required: false,
      categories: ["tshirt"],
    }
  );

  const updateSettings = (key, newValue) => {
    const updated = { ...settings, [key]: newValue };
    setSettings(updated);
    onChange?.({ sizes, settings: updated });
  };

  const updateSizes = (category, newSizes) => {
    const updated = { ...sizes, [category]: newSizes };
    setSizes(updated);
    onChange?.({ sizes: updated, settings });
  };

  const addSize = (category) => {
    const categoryItems = sizes[category] || [];
    const newId = Math.max(...categoryItems.map((s) => s.id), 0) + 1;
    updateSizes(category, [...categoryItems, { id: newId, name: "", chest: "", length: "" }]);
  };

  const removeSize = (category, id) => {
    updateSizes(
      category,
      sizes[category].filter((s) => s.id !== id)
    );
  };

  const updateSize = (category, id, field, value) => {
    updateSizes(
      category,
      sizes[category].map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const toggleCategory = (categoryId) => {
    const currentCategories = settings.categories || [];
    const updated = currentCategories.includes(categoryId)
      ? currentCategories.filter((c) => c !== categoryId)
      : [...currentCategories, categoryId];
    updateSettings("categories", updated);
  };

  return (
    <div className="border border-border rounded-lg p-4 space-y-4  mt-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shirt className="h-5 w-5 text-primary" />
          </div>
          <div>
            <Label className="text-base font-semibold">T-Shirt Size Selection</Label>
            <p className="text-sm text-muted-foreground">
              Allow participants to choose their T-shirt size
            </p>
          </div>
        </div>
        <Switch
          checked={settings.enabled}
          onCheckedChange={(checked) => updateSettings("enabled", checked)}
        />
      </div>

      {settings.enabled && (
        <div className="space-y-4 pt-4 border-t border-border">
          {/* Required/Optional Toggle */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <Label className="font-medium">Required Field</Label>
              <p className="text-xs text-muted-foreground">
                Make T-shirt size mandatory for registration
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {settings.required ? "Required" : "Optional"}
              </span>
              <Switch
                checked={settings.required}
                onCheckedChange={(checked) => updateSettings("required", checked)}
              />
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Size Categories</Label>
            <div className="flex flex-wrap gap-2">
              {sizeCategories.map((cat) => (
                <Button
                  key={cat.id}
                  type="button"
                  variant={settings.categories?.includes(cat.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCategory(cat.id)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Size Management Accordions */}
          <Accordion type="multiple" className="w-full">
            {sizeCategories
              .filter((cat) => settings.categories?.includes(cat.id))
              .map((category) => (
                <AccordionItem key={category.id} value={category.id}>
                  <AccordionTrigger className="text-sm font-medium">
                    {category.label} Sizes ({sizes[category.id]?.length || 0})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      {/* Size Headers */}
                      <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground px-1">
                        <span>Size Name</span>
                        <span>Chest (inches)</span>
                        <span>Length (inches)</span>
                        <span></span>
                      </div>

                      {/* Size Rows */}
                      {(sizes[category.id] || []).map((size) => (
                        <div
                          key={size.id}
                          className="grid grid-cols-4 gap-2 items-center"
                        >
                          <Input
                            placeholder="e.g., M"
                            value={size.name}
                            onChange={(e) =>
                              updateSize(category.id, size.id, "name", e.target.value)
                            }
                            className="h-9"
                          />
                          <Input
                            type="number"
                            placeholder="38"
                            value={size.chest}
                            onChange={(e) =>
                              updateSize(category.id, size.id, "chest", e.target.value)
                            }
                            className="h-9"
                          />
                          <Input
                            type="number"
                            placeholder="28"
                            value={size.length}
                            onChange={(e) =>
                              updateSize(category.id, size.id, "length", e.target.value)
                            }
                            className="h-9"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-destructive"
                            onClick={() => removeSize(category.id, size.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      {/* Add Size Button */}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => addSize(category.id)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add {category.label} Size
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}

export { defaultSizes, sizeCategories };
