"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import adminBibService from "@/services/admin/admin.bib.service";
import { Hash, Loader2, Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function BIBInput({ item }) {
  console.log("BIBInput received item:", item);

  const [bibValue, setBibValue] = useState(item?.participant?.bibNumber || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const orderItemId = item?.id;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.info(`Attached file: ${e.target.files[0].name}`);
    }
  };

  const handleAssign = async () => {
    if (!orderItemId) {
      toast.error("Invalid state: Missing Order Item ID");
      return;
    }
    if (!bibValue.trim()) {
      toast.error("Please enter a valid BIB number before sending");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // 1. Dispatch the API call
      await adminBibService.assignBibNumber(
        orderItemId, 
        bibValue.trim(), 
        selectedFile
      );

      // 🎉 2. Success Toast (Will fire now that execution flow is uninterrupted)
      toast.success(`BIB ${bibValue} successfully assigned to ${item?.participant?.name || "participant"}!`);
      
      // ✨ 3. Clear form data after success
      setBibValue(""); 
      setSelectedFile(null);
      
      // Clear the actual file input element value if necessary
      const fileInput = document.getElementById("bib-file-input");
      if (fileInput) fileInput.value = "";

    } catch (err) {
      console.error("BIB assignment failure:", err);
      toast.error(err?.response?.data?.message || "Failed to process BIB registration assignment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-6 p-4 rounded-lg border-2 border-dashed border-primary/20 bg-primary/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Hash className="h-3.5 w-3.5 text-primary" />
          <h5 className="text-[11px] font-bold text-primary uppercase tracking-wider">
            BIB Assignment
          </h5>
        </div>
        {selectedFile && (
          <span className="text-[10px] text-emerald-600 font-medium truncate max-w-[150px]">
            📎 {selectedFile.name}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Enter BIB Number"
            className="h-9 bg-background text-sm pr-10"
            value={bibValue}
            onChange={(e) => setBibValue(e.target.value)}
            disabled={isSubmitting}
          />
          
          <label className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
            <Paperclip className="h-3.5 w-3.5" />
            <input 
              id="bib-file-input" // Added id to easily target and clear it
              type="file" 
              className="hidden" 
              onChange={handleFileChange}
              disabled={isSubmitting}
              accept="image/*,application/pdf"
            />
          </label>
        </div>

        <Button 
          size="sm" 
          className="h-9 px-3 flex gap-1.5 shadow-sm min-w-[90px]"
          onClick={handleAssign}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className="text-xs">Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-3 w-3" />
              <span className="text-xs">Send</span>
            </>
          )}
        </Button>
      </div>

      <p className="text-[9px] text-muted-foreground mt-2 leading-relaxed italic">
        Sending will assign the data structure and notify {item?.participant?.name || "the runner"} via SMS & Email channels.
      </p>
    </div>
  );
}