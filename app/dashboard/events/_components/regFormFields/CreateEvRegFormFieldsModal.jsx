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
import { createRegistrationFields } from "@/services/admin/admin.regFormField.service";
import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function CreateEvRegFormFieldsModal({ open, setOpen, onRefresh, eventId }) {
  const [fields, setFields] = useState([
    {
      eventId: eventId,
      label: "",
      type: "text",
      placeholder: "",
      options: [],
      order: 0,
      required: true,
      enabled: true,
    },
  ]);

  const [loading, setLoading] = useState(false);

  // --- Core Field Logic ---
  const handleChange = (index, field, value) => {
    const updated = [...fields];
    updated[index][field] = value;
    // If user switches away from 'select', clear the options
    if (field === "type" && value !== "select") {
      updated[index].options = [];
    }
    setFields(updated);
  };

  const addField = () => {
    setFields([
      ...fields,
      {
        eventId: eventId,
        label: "",
        type: "text",
        placeholder: "",
        options: [],
        order: fields.length,
        required: true,
        enabled: true,
      },
    ]);
  };

  const removeField = (index) => {
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
  };

  // --- Options Management Logic ---
  const addOption = (fieldIndex) => {
    const updated = [...fields];
    updated[fieldIndex].options.push({ label: "", value: "" });
    setFields(updated);
  };

  const updateOption = (fieldIndex, optionIndex, key, value) => {
    const updated = [...fields];
    updated[fieldIndex].options[optionIndex][key] = value;

    // Auto-generate 'value' if label is typed and value is empty
    if (key === "label" && !updated[fieldIndex].options[optionIndex].value) {
      updated[fieldIndex].options[optionIndex].value = value
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");
    }
    setFields(updated);
  };

  const removeOption = (fieldIndex, optionIndex) => {
    const updated = [...fields];
    updated[fieldIndex].options = updated[fieldIndex].options.filter((_, i) => i !== optionIndex);
    setFields(updated);
  };

  const resetForm = () => {
    setFields([
      {
        eventId: eventId,
        label: "",
        type: "text",
        placeholder: "",
        options: [],
        order: 0,
        required: true,
        enabled: true,
      },
    ]);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = fields.map((f) => ({
        eventId: Number(eventId),
        label: f.label.trim(),
        type: f.type,
        placeholder: f.placeholder.trim(),
        // Clean options for Select, Radio, and Checkbox
        options: ["select", "radio", "checkbox"].includes(f.type)
          ? f.options.filter(opt => opt.label.trim() !== "")
          : [],
        order: Number(f.order),
        required: Boolean(f.required),
        enabled: Boolean(f.enabled),
      }));

      await createRegistrationFields(payload);

      resetForm();
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Field creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) resetForm();
      }}
    >
      <DialogContent className="max-w-4xl bg-[#0a0a0a] text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle>Add Registration Form Fields</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 border border-zinc-800 p-4 rounded-lg bg-zinc-900/50"
            >
              <div className="grid md:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-400">Label</label>
                  <Input
                    placeholder="e.g. Full Name"
                    value={field.label}
                    className="bg-zinc-950 border-zinc-800"
                    onChange={(e) => handleChange(index, "label", e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-400">Type</label>
                  <Select
                    value={field.type}
                    onValueChange={(val) => handleChange(index, "type", val)}
                  >
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
                    placeholder="Enter your..."
                    value={field.placeholder}
                    className="bg-zinc-950 border-zinc-800"
                    onChange={(e) => handleChange(index, "placeholder", e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-400">Sort Order</label>
                  <Input
                    type="number"
                    value={field.order}
                    className="bg-zinc-950 border-zinc-800"
                    onChange={(e) => handleChange(index, "order", e.target.value)}
                  />
                </div>
              </div>

              {/* Options UI - Triggered by Select, Radio, or Checkbox types */}
              {["select", "radio", "checkbox"].includes(field.type) && (
                <div className="bg-zinc-950/50 p-4 rounded-md border border-dashed border-zinc-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-300">
                      {field.type === "select" ? "Dropdown Options" :
                        field.type === "radio" ? "Radio Buttons" : "Multiple Checkboxes"}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      type="button" // Always specify type="button" in forms to prevent accidental submit
                      onClick={() => addOption(index)}
                      className="h-8 border-zinc-700 hover:bg-zinc-800"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Option
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {field.options.map((opt, optIndex) => (
                      <div key={optIndex} className="flex gap-2 items-center">
                        <Input
                          placeholder="Display Label"
                          value={opt.label}
                          className="bg-zinc-900 border-zinc-800 h-9"
                          onChange={(e) => updateOption(index, optIndex, "label", e.target.value)}
                        />
                        <Input
                          placeholder="Database Value"
                          value={opt.value}
                          className="bg-zinc-900 border-zinc-800 h-9"
                          onChange={(e) => updateOption(index, optIndex, "value", e.target.value)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(index, optIndex)}
                          className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`req-${index}`}
                      checked={field.required}
                      onCheckedChange={(val) => handleChange(index, "required", val)}
                    />
                    <label htmlFor={`req-${index}`} className="text-sm text-zinc-300 cursor-pointer">Required</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`en-${index}`}
                      checked={field.enabled}
                      onCheckedChange={(val) => handleChange(index, "enabled", val)}
                    />
                    <label htmlFor={`en-${index}`} className="text-sm text-zinc-300 cursor-pointer">Enabled</label>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  onClick={() => removeField(index)}
                  disabled={fields.length === 1}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Remove Field
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4 border-t border-zinc-800">
          <Button variant="outline" className="border-zinc-700" onClick={addField}>
            <Plus className="h-4 w-4 mr-1" /> Add Another Field
          </Button>

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              className="bg-white text-black hover:bg-zinc-200"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save All Fields"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}