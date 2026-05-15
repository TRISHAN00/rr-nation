"use client";

import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { updateRegistrationField } from "@/services/admin/admin.regFormField.service";
import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function UpdateEvRegFormFieldModal({ open, setOpen, onRefresh, fieldData }) {
  const originalData = useRef(null);

  const [field, setField] = useState({
    registrationFormFieldId: null,
    label: "",
    labelText: "", // This will hold your plain, exact text
    type: "text",
    placeholder: "",
    options: [],
    order: 0,
    required: true,
    enabled: true,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fieldData) {
      const initialValues = {
        registrationFormFieldId: fieldData.id || fieldData.registrationFormFieldId,
        label: fieldData.label || "",
        labelText: fieldData.labelText || fieldData.label || "",
        type: fieldData.type || "text",
        placeholder: fieldData.placeholder || "",
        options: fieldData.options || [],
        order: fieldData.order || 0,
        required: fieldData.required ?? true,
        enabled: fieldData.enabled ?? true,
      };
      setField(initialValues);
      // Store a deep copy to track changes
      originalData.current = JSON.parse(JSON.stringify(initialValues));
    }
  }, [fieldData]);

  const handleChange = (key, value) => {
    setField((prev) => {
      const typesWithOptions = ["select", "radio", "checkbox"];
      return {
        ...prev,
        [key]: value,
        options: key === "type" && !typesWithOptions.includes(value) ? [] : prev.options,
      };
    });
  };

  const addOption = () => {
    setField((prev) => ({
      ...prev,
      options: [...prev.options, { label: "", value: "" }]
    }));
  };

  const updateOption = (index, key, value) => {
    const newOptions = [...field.options];
    newOptions[index][key] = value;

    // We only slugify the internal "value". 
    // The option "label" stays as plain text input by the user.
    if (key === "label" && !newOptions[index].value) {
      newOptions[index].value = value
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");
    }
    setField((prev) => ({ ...prev, options: newOptions }));
  };

  const removeOption = (index) => {
    setField((prev) => ({
      ...prev,
      options: field.options.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // 1. Always include the ID so the backend knows which record to update
      const payload = {
        registrationFormFieldId: Number(field.registrationFormFieldId),
      };

      // 2. Track and add only changed fields to payload
      Object.keys(field).forEach((key) => {
        if (key === "registrationFormFieldId") return;

        const currentValue = field[key];
        const initialValue = originalData.current[key];

        // Deep comparison for the options array, simple comparison for others
        if (key === "options") {
          if (JSON.stringify(currentValue) !== JSON.stringify(initialValue)) {
            payload[key] = currentValue.filter(opt => opt.label.trim() !== "");
          }
        } else if (currentValue !== initialValue) {
          payload[key] = currentValue;
        }
      });

      // 3. Prevent API call if nothing changed (except ID)
      if (Object.keys(payload).length === 1) {
        setOpen(false);
        return;
      }

      await updateRegistrationField(payload);
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Field update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl bg-[#0a0a0a] text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle>Update Registration Field</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Internal Identifier (Database Label) */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-400">Identifier (ID)</label>
              <Input
                value={field.label}
                placeholder="e.g. user_age"
                className="bg-zinc-950 border-zinc-800"
                onChange={(e) => handleChange("label", e.target.value)}
              />
            </div>

            {/* User Facing Label (Plain Data) */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-400">Label Text (Plain Display)</label>
              <Input
                value={field.labelText}
                placeholder="e.g. Enter Your Age @ 2024"
                className="bg-zinc-950 border-zinc-800"
                // This input will accept any characters, caps, and numbers as is
                onChange={(e) => handleChange("labelText", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-400">Type</label>
              <Select value={field.type} onValueChange={(val) => handleChange("type", val)}>
                <SelectTrigger className="bg-zinc-950 border-zinc-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="file">File</SelectItem>
                  <SelectItem value="radio">Radio</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="textarea">Textarea</SelectItem>
                  <SelectItem value="select">Select / Dropdown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-400">Placeholder</label>
              <Input
                value={field.placeholder}
                className="bg-zinc-950 border-zinc-800"
                onChange={(e) => handleChange("placeholder", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-400">Sort Order</label>
              <Input
                type="number"
                value={field.order}
                className="bg-zinc-950 border-zinc-800"
                onChange={(e) => handleChange("order", e.target.value)}
              />
            </div>
          </div>

          {["select", "radio", "checkbox"].includes(field.type) && (
            <div className="bg-zinc-950/50 p-4 rounded-md border border-dashed border-zinc-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-300">Options Management</span>
                <Button variant="outline" size="sm" onClick={addOption} className="h-8 border-zinc-700">
                  <Plus className="h-4 w-4 mr-1" /> Add Option
                </Button>
              </div>

              <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                {field.options.map((opt, optIndex) => (
                  <div key={optIndex} className="flex gap-2 items-center">
                    <Input
                      placeholder="Display Label (Exact Text)"
                      value={opt.label}
                      className="bg-zinc-900 border-zinc-800 h-9"
                      onChange={(e) => updateOption(optIndex, "label", e.target.value)}
                    />
                    <Input
                      placeholder="DB Value (Slug)"
                      value={opt.value}
                      className="bg-zinc-900 border-zinc-800 h-9"
                      onChange={(e) => updateOption(optIndex, "value", e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOption(optIndex)}
                      className="text-zinc-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-6 border-t border-zinc-800 pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-req"
                checked={field.required}
                onCheckedChange={(val) => handleChange("required", val)}
              />
              <label htmlFor="edit-req" className="text-sm text-zinc-300 cursor-pointer">Required</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-en"
                checked={field.enabled}
                onCheckedChange={(val) => handleChange("enabled", val)}
              />
              <label htmlFor="edit-en" className="text-sm text-zinc-300 cursor-pointer">Enabled</label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            className="bg-white text-black hover:bg-zinc-200"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Field"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}