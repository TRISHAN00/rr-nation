"use client";

import { getMemberOverviewData } from "@/services/admin/admin.member.service";
import { CheckCircle, Clock, DollarSign, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { StatCard } from "../../_components/StatCard";
import { StatCardSkeleton } from "./StatCardSkeleton";

export default function MemberStats() {
    const [members, setMembers] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await getMemberOverviewData();
            setMembers(res?.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const totalMembers =
        (members?.paidApprovedCount || 0) +
        (members?.pendingPaymentCount || 0) +
        (members?.paidPendingApprovalCount || 0);

    return (
        <div className="grid gap-4 md:grid-cols-4 mt-4">

            {/* SKELETON */}
            {loading ? (
                <>
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                </>
            ) : (
                <>
                    <StatCard
                        icon={<Users className="h-5 w-5 text-blue-600" />}
                        label="Total Members"
                        value={totalMembers}
                        subText="All registered members"
                        color="bg-blue-500/10"
                    />

                    <StatCard
                        icon={<CheckCircle className="h-5 w-5 text-green-600" />}
                        label="Paid & Approved"
                        value={members?.paidApprovedCount || 0}
                        subText="Fully confirmed"
                        color="bg-green-500/10"
                    />

                    <StatCard
                        icon={<Clock className="h-5 w-5 text-yellow-600" />}
                        label="Pending Payment"
                        value={members?.pendingPaymentCount || 0}
                        subText="Awaiting payment"
                        color="bg-yellow-500/10"
                    />

                    <StatCard
                        icon={<DollarSign className="h-5 w-5 text-purple-600" />}
                        label="Total Revenue"
                        value={`৳${members?.totalRevenue || 0}`}
                        subText="From paid members"
                        color="bg-purple-500/10"
                    />
                </>
            )}

        </div>
    );
}