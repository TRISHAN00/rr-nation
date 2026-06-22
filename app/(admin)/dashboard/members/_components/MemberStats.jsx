"use client";

import { getMemberOverviewData } from "@/services/admin/admin.member.service";
import { CheckCircle, Clock, DollarSign, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { StatCard } from "../../_components/StatCard";
import { StatCardSkeleton } from "./StatCardSkeleton";

export default function MemberStats() {
    const [members, setMembers] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const stats = members || {};

    const totalMembers =
        (stats?.paidApprovedCount || 0) +
        (stats?.paidPendingApprovalCount || 0) +
        (stats?.pendingPaymentCount || 0);

    return (
        <div className="grid gap-4 md:grid-cols-4 mt-4">

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
                        icon={<Users className="h-5 w-5" />}
                        title="Total Members"
                        value={totalMembers}
                        change="All registered"
                    />

                    <StatCard
                        icon={<CheckCircle className="h-5 w-5" />}
                        title="Paid & Approved"
                        value={stats.paidApprovedCount || 0}
                        change="Fully confirmed"
                    />

                    <StatCard
                        icon={<Clock className="h-5 w-5" />}
                        title="Pending Payment"
                        value={stats.pendingPaymentCount || 0}
                        change="Awaiting payment"
                    />

                    <StatCard
                        icon={<DollarSign className="h-5 w-5" />}
                        title="Total Revenue"
                        value={`৳${stats.totalRevenue || 0}`}
                        change="From paid members"
                    />
                </>
            )}

        </div>
    );
}
