"use client"
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Shirt } from "lucide-react";
import { useEffect, useState } from "react";
import AddEditTShirtSizeModal from "./AddEditTShirtSizeModal";
import TShirtSizeList from "./TShirtSizeList";
import { createTShirtSizes, getTShirtSizesByEvent } from "@/services/admin/admin.tshirtSize.service";

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

const defaultSettings = {
  enabled: true,
  required: false,
  categories: ["adult"], // default category
};

export function TShirtSizeManager({ eventId }) {
 const [sizes, setSizes] = useState({ adult: [], kids: [] });
  const [settings, setSettings] = useState(defaultSettings);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // ---------- FETCH SIZES ----------
  const fetchSizes = async () => {
    try {
      const res = await getTShirtSizesByEvent(eventId);
      if (res.status === 200) {
        const grouped = { adult: [], kids: [] };
        res.data.data.forEach((item) => {
          grouped[item.category] = [...(grouped[item.category] || []), item];
        });
        setSizes(grouped);
      }
    } catch (err) {
      console.error("Failed to fetch T-shirt sizes", err);
    }
  };

  useEffect(() => {
    if (eventId) fetchSizes();
  }, [eventId]);

  // ---------- SETTINGS ----------
  const updateSettings = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

    // ---------- MODAL SUBMIT ----------
  const handleSizeSubmit = async (category, size) => {
    try {
      const payload = [
        {
          eventId,
          category,
          sizeName: size.name,
          chest: Number(size.chest),
          length: Number(size.length),
        },
      ];
      const res = await createTShirtSizes(payload);
      if (res.status === 200) {
        fetchSizes();
      }
    } catch (err) {
      console.error("Failed to create T-shirt size", err);
    } finally {
      setModalOpen(false);
    }
  }

  return (
    <div className="border rounded-lg p-4 mt-4 mb-4 space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shirt className="h-5 w-5 text-primary" />
          </div>
          <div>
            <Label className="text-base font-semibold">
              T-Shirt Size Selection
            </Label>
            <p className="text-sm text-muted-foreground">
              Allow participants to choose T-shirt size
            </p>
          </div>
        </div>

        <Switch
          checked={settings.enabled}
          onCheckedChange={(v) => updateSettings("enabled", v)}
        />
      </div>

      {settings.enabled && (
        <>
          {/* SIZE LIST */}
          <TShirtSizeList
            sizes={sizes}
            categories={settings.categories}
            onAdd={(cat) => {
              setActiveCategory(cat);
              setModalOpen(true);
            }}
            onRemove={async (cat, id) => {
              try {
                await updateTShirtSizes(eventId, [
                  { tShirtSizeId: id, isArchived: true },
                ]);
                fetchSizes();
              } catch (err) {
                console.error("Failed to archive size", err);
              }
            }}
            onUpdate={async (cat, id, field, value) => {
              try {
                const existing = sizes[cat].find((s) => s.id === id);
                if (!existing) return;
                await updateTShirtSizes(eventId, [
                  {
                    tShirtSizeId: id,
                    category: cat,
                    sizeName: field === "name" ? value : existing.sizeName,
                    chest: field === "chest" ? Number(value) : existing.chest,
                    length: field === "length" ? Number(value) : existing.length,
                  },
                ]);
                fetchSizes();
              } catch (err) {
                console.error("Failed to update size", err);
              }
            }}
          />

          {/* ADD/EDIT MODAL */}
          <AddEditTShirtSizeModal
            open={modalOpen}
            setOpen={setModalOpen}
            category={activeCategory}
            onSubmit={handleSizeSubmit}
          />
        </>
      )}
    </div>
  );
}

export { defaultSizes, sizeCategories };
