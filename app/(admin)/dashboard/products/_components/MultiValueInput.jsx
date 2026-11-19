"use client";

import { Label } from "@/app/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";

const parseValues = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export default function MultiValueInput({ label, value, onChange, placeholder }) {
  const [draft, setDraft] = useState("");
  const values = parseValues(value);

  const commit = (raw) => {
    const incoming = parseValues(raw);
    if (!incoming.length) {
      setDraft("");
      return;
    }

    const next = [...values];
    incoming.forEach((item) => {
      const exists = next.some(
        (existing) => existing.toLowerCase() === item.toLowerCase(),
      );
      if (!exists) next.push(item);
    });

    onChange(next.join(","));
    setDraft("");
  };

  const remove = (item) => {
    onChange(
      values
        .filter((existing) => existing !== item)
        .join(","),
    );
  };

  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-2 py-1.5 text-sm">
        {values.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
          >
            {item}
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => remove(item)}
              aria-label={`Remove ${item}`}
              className="rounded-sm text-muted-foreground transition-colors hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              commit(draft);
            } else if (event.key === "Backspace" && !draft && values.length) {
              onChange(values.slice(0, -1).join(","));
            }
          }}
          onBlur={() => draft && commit(draft)}
          onPaste={(event) => {
            const text = event.clipboardData.getData("text");
            if (text.includes(",")) {
              event.preventDefault();
              commit(text);
            }
          }}
          placeholder={values.length ? "" : placeholder}
          className="min-w-[80px] flex-1 bg-transparent py-0.5 outline-none placeholder:text-muted-foreground"
        />
      </div>
      <p className="text-[11px] text-muted-foreground">
        Press Enter or comma to add
      </p>
    </div>
  );
}
