"use client";

import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { createTshirtSizes, getSizesById } from "@/services/admin/admin.tshirtSize.service";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteSize } from "../../../../../services/admin/admin.tshirtSize.service";
import AddTshirtSizeForm from "./AddTshirtSizeForm";

export default function EventTshirt({ eventId }) {
  const [sizesList, setSizesList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchSizes = async () => {
    setLoading(true);
    try {
      const response = await getSizesById(eventId);
      if (response?.status === 200) {
        setSizesList(response?.data?.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch T-shirt sizes", error);
      toast.error("Failed to load T-shirt sizes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) fetchSizes();
  }, [eventId]);

  const handleSizesSubmit = (sizeData) => {
    setSizesList((prev) => [...prev, sizeData]);
    setModalOpen(false);
  };

  const handleSubmitAll = async () => {
    if (sizesList.length === 0) {
      return toast.error("No sizes to submit");
    }

    try {
      const payload = sizesList.map((size) => ({
        ...size,
        chest: Number(size.chest),
        length: Number(size.length),
        eventId: Number(eventId),
      }));

      await createTshirtSizes(payload);
      toast.success("T-shirt sizes submitted successfully!");
      setSizesList([]);
      fetchSizes();
    } catch (error) {
      console.error("Error submitting sizes:", error);
      toast.error("Failed to submit T-shirt sizes");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSize(id);
      toast.success("Size deleted successfully");
      fetchSizes();
    } catch (error) {
      console.error("Failed to delete size:", error);
      toast.error("Failed to delete size");
    }
  };

  return (
    <div className="space-y-4 border rounded-lg p-4  shadow-sm mt-6">
      <div className="flex justify-between items-center">
        <Label className="text-lg font-semibold">Event T-Shirt Sizes</Label>
        <Button size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add Size
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading sizes...</p>
      ) : (
        <div className="space-y-3">
          {sizesList.length === 0 && (
            <p className="text-gray-500 text-sm">No sizes added yet.</p>
          )}

          {sizesList.map((size, index) => (
            <div
              key={size.id || index}
              className="flex justify-between items-center p-3 bg-muted rounded-lg"
            >
              <div>
                <p className="font-medium">
                  {size.category} - {size.sizeName}
                </p>
                <p className="text-sm text-gray-500">
                  Chest: {size.chest} cm | Length: {size.length} cm
                </p>
              </div>

              <div className="flex gap-2">
                <Button size="icon" variant="ghost" disabled>
                  <Edit className="w-4 h-4 text-gray-400" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(size.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}

          {sizesList.length > 0 && (
            <Button onClick={handleSubmitAll} className=" mt-2">
              Submit All Sizes
            </Button>
          )}
        </div>
      )}

      <AddTshirtSizeForm
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        eventId={eventId}
        onSizesSubmit={handleSizesSubmit}
      />
    </div>
  );
}
