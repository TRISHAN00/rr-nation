"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

export default function TShirtSizeList({ sizes, categories, onAdd, onRemove, onUpdate }) {
  return (
    <Accordion type="multiple" className="w-full space-y-3">
      {categories.map((categoryId) => {
        const categorySizes = sizes[categoryId] || [];
        const categoryLabel = categoryId === "tshirt" ? "T-Shirt (Adult)" : "Kids";

        return (
          <AccordionItem key={categoryId} value={categoryId}>
            <AccordionTrigger className="text-sm font-medium">
              {categoryLabel} Sizes ({categorySizes.length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {/* Size headers */}
                <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground px-1">
                  <span>Size Name</span>
                  <span>Chest (inches)</span>
                  <span>Length (inches)</span>
                  <span></span>
                </div>

                {/* Sizes */}
                {categorySizes.map((size) => (
                  <div key={size.id} className="grid grid-cols-4 gap-2 items-center">
                    <Input
                      value={size.name}
                      onChange={(e) => onUpdate?.(categoryId, size.id, "name", e.target.value)}
                      className="h-9"
                      placeholder="M"
                    />
                    <Input
                      type="number"
                      value={size.chest}
                      onChange={(e) => onUpdate?.(categoryId, size.id, "chest", e.target.value)}
                      className="h-9"
                      placeholder="38"
                    />
                    <Input
                      type="number"
                      value={size.length}
                      onChange={(e) => onUpdate?.(categoryId, size.id, "length", e.target.value)}
                      className="h-9"
                      placeholder="28"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-destructive"
                      onClick={() => onRemove?.(categoryId, size.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {/* Add size */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => onAdd?.(categoryId)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add {categoryLabel} Size
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
