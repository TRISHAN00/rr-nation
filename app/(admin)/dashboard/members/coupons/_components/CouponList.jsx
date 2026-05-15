"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/app/components/ui/card";
import {
    Table
} from "@/app/components/ui/table";

import { getMemberCoupons } from "@/services/admin/admin.member.coupon.service";
import CouponMemberTableBody from "./CouponMemberTableBody";
import CouponMemberTableHeader from "./CouponMemberTableHeader";
import CouponPageHeader from "./CouponPageHeader";

export default function CouponList() {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCoupons = async () => {
        try {
            setLoading(true);
            const res = await getMemberCoupons();
            setCoupons(res?.data?.items || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    return (
        <>
            <CouponPageHeader onCoupons={fetchCoupons} />
            <Card className="border-border bg-card shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        {/* HEADER */}
                        <CouponMemberTableHeader />

                        {/* BODY */}
                        <CouponMemberTableBody
                            loading={loading}
                            coupons={coupons}
                            onRefresh={fetchCoupons}
                        />
                    </Table>

                    {/* EMPTY STATE */}
                    {!loading && coupons.length === 0 && (
                        <div className="py-12 text-center text-muted-foreground">
                            No coupons found.
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    );
}