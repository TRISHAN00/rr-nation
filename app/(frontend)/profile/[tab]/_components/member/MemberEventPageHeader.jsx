"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import CreateMemberEventModal from "./CreateMemberEventModal";

export default function MemberEventPageHeader({ onRefresh, onExportCSV, events }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                My Events
            </h2>

            <div className="flex items-center gap-2">
                {events?.length > 0 && (
                    <Button variant="outline" size="sm" onClick={onExportCSV}>
                        <Download className="h-4 w-4 mr-1.5" /> Export CSV
                    </Button>
                )}
                <Button onClick={() => setOpen(true)}>
                    + Add Event
                </Button>
            </div>

            <CreateMemberEventModal open={open} setOpen={setOpen} onRefresh={onRefresh} />
        </div>
    )
}
