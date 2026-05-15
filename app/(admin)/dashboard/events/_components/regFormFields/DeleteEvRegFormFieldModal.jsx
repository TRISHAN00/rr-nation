"use client";

import { Button } from "@/app/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { deleteRegistrationField } from "@/services/admin/admin.regFormField.service";
import { useState } from "react";

export default function DeleteEvRegFormFieldModal({
  open,
  setOpen,
  registrationFormFieldId,
  onRefresh,
}) {
  const [loading, setLoading] = useState(false);

  console.log("Delete Modal Opened with ID:", registrationFormFieldId);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteRegistrationField(registrationFormFieldId);

      onRefresh();
      setOpen(false);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Registration Form Field</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-500">
          Are you sure you want to delete this registration form field? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}