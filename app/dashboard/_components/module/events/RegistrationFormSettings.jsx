"use client"
import { Badge } from "@/app/components/ui/badge";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Asterisk, GripVertical, Settings } from "lucide-react";
import { useState } from "react";

const defaultFormFields = [
  { id: "name", label: "Full Name", enabled: true, required: true, locked: true },
  { id: "email", label: "Email Address", enabled: true, required: true, locked: true },
  { id: "phone", label: "Phone Number", enabled: true, required: true, locked: false },
  { id: "gender", label: "Gender", enabled: true, required: false, locked: false },
  { id: "dob", label: "Date of Birth", enabled: true, required: false, locked: false },
  { id: "emergency_contact", label: "Emergency Contact", enabled: true, required: false, locked: false },
  { id: "emergency_phone", label: "Emergency Phone", enabled: true, required: false, locked: false },
  { id: "blood_group", label: "Blood Group", enabled: false, required: false, locked: false },
  { id: "address", label: "Address", enabled: false, required: false, locked: false },
  { id: "organization", label: "Organization/Company", enabled: false, required: false, locked: false },
  { id: "tshirt_size", label: "T-Shirt Size", enabled: false, required: false, locked: false, special: true },
];

export function RegistrationFormSettings({ value, onChange }) {
  const [fields, setFields] = useState(value || defaultFormFields);

  const updateField = (id, key, newValue) => {
    const updated = fields.map((f) => {
      if (f.id === id) {
        // If disabling, also set required to false
        if (key === "enabled" && !newValue) {
          return { ...f, enabled: false, required: false };
        }
        return { ...f, [key]: newValue };
      }
      return f;
    });
    setFields(updated);
    onChange?.(updated);
  };

  return (
    <div className="border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Settings className="h-5 w-5 text-primary" />
        </div>
        <div>
          <Label className="text-base font-semibold">Registration Form Fields</Label>
          <p className="text-sm text-muted-foreground">
            Enable/disable and set required fields for this event
          </p>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        {/* Header */}
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground px-2 pb-2 border-b border-border">
          <span className="col-span-5">Field</span>
          <span className="col-span-3 text-center">Enabled</span>
          <span className="col-span-4 text-center">Required</span>
        </div>

        {/* Fields */}
        {fields.map((field) => (
          <div
            key={field.id}
            className={`grid grid-cols-12 gap-2 items-center p-2 rounded-lg transition-colors ${
              field.enabled ? "bg-muted/30" : "bg-muted/10 opacity-60"
            }`}
          >
            <div className="col-span-5 flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground/50" />
              <span className="text-sm font-medium">{field.label}</span>
              {field.locked && (
                <Badge variant="outline" className="text-xs px-1.5 py-0">
                  Required
                </Badge>
              )}
              {field.special && (
                <Badge variant="outline" className="text-xs px-1.5 py-0 bg-primary/10 text-primary border-primary/20">
                  T-Shirt
                </Badge>
              )}
            </div>
            <div className="col-span-3 flex justify-center">
              <Switch
                checked={field.enabled}
                onCheckedChange={(checked) => updateField(field.id, "enabled", checked)}
                disabled={field.locked}
              />
            </div>
            <div className="col-span-4 flex justify-center items-center gap-2">
              <Switch
                checked={field.required}
                onCheckedChange={(checked) => updateField(field.id, "required", checked)}
                disabled={!field.enabled || field.locked}
              />
              {field.required && field.enabled && (
                <Asterisk className="h-3 w-3 text-destructive" />
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground pt-2 border-t border-border">
        Note: Name and Email are always required for registration.
      </p>
    </div>
  );
}

export { defaultFormFields };

