"use client";

import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox"; // Added for 'required' and 'enabled'
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
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
// Import your actual registration field service here

export default function CreateEvRegFormFieldsModal({ open, setOpen, onRefresh, eventId }) {
  const [fields, setFields] = useState([
    {
      eventId: eventId,
      label: "",
      type: "text",
      placeholder: "",
      options: [], // Handled as empty for now or can be expanded
      order: 0,
      required: true,
      enabled: true,
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...fields];
    updated[index][field] = value;
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
        options: f.options, 
        order: Number(f.order),
        required: Boolean(f.required),
        enabled: Boolean(f.enabled),
      }));

      await createRegistrationFields (payload);

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
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Registration Form Fields</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 border p-4 rounded-lg bg-muted/20"
            >
              <div className="grid md:grid-cols-4 gap-3">
                {/* Label */}
                <div className="space-y-1">
                  <label className="text-xs font-medium">Label</label>
                  <Input
                    placeholder="e.g. Full Name"
                    value={field.label}
                    onChange={(e) => handleChange(index, "label", e.target.value)}
                  />
                </div>

                {/* Type */}
                <div className="space-y-1">
                  <label className="text-xs font-medium">Type</label>
                  <Select
                    value={field.type}
                    onValueChange={(val) => handleChange(index, "type", val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="file">File</SelectItem>
                      <SelectItem value="select">Select / Dropdown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Placeholder */}
                <div className="space-y-1">
                  <label className="text-xs font-medium">Placeholder</label>
                  <Input
                    placeholder="Enter your..."
                    value={field.placeholder}
                    onChange={(e) => handleChange(index, "placeholder", e.target.value)}
                  />
                </div>

                {/* Order */}
                <div className="space-y-1">
                  <label className="text-xs font-medium">Sort Order</label>
                  <Input
                    type="number"
                    value={field.order}
                    onChange={(e) => handleChange(index, "order", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-3">
                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`req-${index}`}
                      checked={field.required}
                      onCheckedChange={(val) => handleChange(index, "required", val)}
                    />
                    <label htmlFor={`req-${index}`} className="text-sm cursor-pointer">Required</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`en-${index}`}
                      checked={field.enabled}
                      onCheckedChange={(val) => handleChange(index, "enabled", val)}
                    />
                    <label htmlFor={`en-${index}`} className="text-sm cursor-pointer">Enabled</label>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeField(index)}
                  disabled={fields.length === 1}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Remove Field
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={addField}>
            <Plus className="h-4 w-4 mr-1" /> Add Another Field
          </Button>

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Save All Fields"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}