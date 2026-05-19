"use client";

import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import MemPayModal from "./MemPayModal";
import MemberEvents from "./MemberEvents";

const MEMBER_TYPE_LABELS = {
    premium: "Premium Member",
    basic: "Basic Member",
};

const PAYMENT_STATUS_LABELS = {
    paid: "Payment Completed",
    pending: "Payment Pending",
    failed: "Payment Failed",
};

export default function MemberDetailView({ member }) {
    const [open, setOpen] = useState(false);

    const isPaid = member?.data?.paymentStatus === "paid";

    const DataRow = ({ label, value }) => (
        <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
            <span className="text-gray-500 font-medium">{label}</span>
            <span className="text-gray-900 font-semibold">{value ?? "N/A"}</span>
        </div>
    );

    return (
        <div className="mt-6 space-y-6">
            <Card className="border-gray-200">

                {/* HEADER */}
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Member Profile Details</CardTitle>

                        <div className="flex items-center gap-3">

                            <div className="flex gap-2">
                                <Badge variant="outline">
                                    {MEMBER_TYPE_LABELS[member?.data?.memberType] || "N/A"}
                                </Badge>

                                <Badge variant={isPaid ? "default" : "secondary"}>
                                    {PAYMENT_STATUS_LABELS[member?.data?.paymentStatus] || "Unknown"}
                                </Badge>
                            </div>

                            {!isPaid && (
                                <Button size="sm" onClick={() => setOpen(true)}>
                                    Make Payment
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>

                {/* CONTENT */}
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Personal Info
                        </h4>

                        <DataRow label="Registration ID" value={member?.data?.registrationNumber} />
                        <DataRow label="Age" value={member?.data?.age} />
                        <DataRow label="Occupation" value={member?.data?.occupation} />
                        <DataRow label="Special Skill" value={member?.data?.specialSkill} />
                        <DataRow label="District" value={member?.data?.district} />
                        <DataRow label="Facebook" value={member?.data?.facebookLink} />
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Event Data
                        </h4>

                        <DataRow label="Event Type" value={member?.data?.eventType} />
                        <DataRow
                            label="Target Distance"
                            value={
                                member?.data?.preferableRunningDistance
                                    ? `${member?.data?.preferableRunningDistance} km`
                                    : "N/A"
                            }
                        />
                        <DataRow label="T-Shirt Size" value={member?.data?.tShirtSize} />
                        <DataRow label="Past Participations" value={member?.data?.eventsParticipatedNumber} />
                        <DataRow label="Event Staff" value={member?.data?.isEventStaff ? "Yes" : "No"} />
                    </div>
                </CardContent>

                <Separator className="my-6" />

                <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <DataRow label="Gateway" value={member?.data?.paymentGateway} />
                        <DataRow label="Currency" value={member?.data?.currency} />
                        <DataRow label="Admin Approval" value={member?.data?.adminApproval} />
                    </div>
                </CardContent>

            </Card>

            <MemberEvents/>

            <MemPayModal open={open} setOpen={setOpen} memberId={member?.data?.id}
            />
        </div>
    );
}