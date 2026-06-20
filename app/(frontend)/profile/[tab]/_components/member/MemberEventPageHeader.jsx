"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateMemberEventModal from "./CreateMemberEventModal";

export default function MemberEventPageHeader({ onRefresh }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                My Events
            </h2>

            <Button onClick={() => setOpen(true)} >
                + Add Event
            </Button>

            <CreateMemberEventModal open={open} setOpen={setOpen} onRefresh={onRefresh} />
        </div>
    )
}
