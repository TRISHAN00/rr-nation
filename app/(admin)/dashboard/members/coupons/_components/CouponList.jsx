"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import {
    Table
} from "@/app/components/ui/table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { useDebounce } from "@/hooks/useDebounce";
import { getMemberCoupons } from "@/services/admin/admin.member.coupon.service";
import CouponMemberTableBody from "./CouponMemberTableBody";
import CouponMemberTableHeader from "./CouponMemberTableHeader";
import CouponPageHeader from "./CouponPageHeader";

export default function CouponList() {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [searchInput, setSearchInput] = useState("");
    const [totalItems, setTotalItems] = useState(0);
    const search = useDebounce(searchInput, 400);

    const totalPages = Math.ceil(totalItems / limit);

    const fetchCoupons = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getMemberCoupons(page, limit, search);
            setCoupons(res?.data?.items || res?.items || []);
            setTotalItems(res?.data?.count || res?.data?.total || res?.total || 0);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [page, limit, search]);

    const handleExportCSV = () => {
        const headers = [
            "Coupon Code", "Discount Type", "Value",
            "Used Count", "Usage Limit", "Is Active", "Is Archived",
            "Created At",
        ];

        const csvData = coupons.map((c) => {
            const clean = (val) => val != null ? `"${String(val).replace(/"/g, '""')}"` : '""';
            return [
                clean(c.code),
                clean(c.discountType),
                c.discountType === "percentage" ? `${c.value}%` : c.value,
                c.usedCount ?? 0,
                c.usageLimit ?? 0,
                c.isActive ? "Yes" : "No",
                c.isArchived ? "Yes" : "No",
                clean(c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ""),
            ];
        });

        const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n");
        const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Coupon_Export_${new Date().toISOString().split("T")[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        setPage(1);
    }, [search]);

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    return (
        <>
            <CouponPageHeader onCoupons={fetchCoupons} coupons={coupons} onExportCSV={handleExportCSV} />
            <div className="flex items-center gap-2 my-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search coupons..."
                        className="pl-9 h-10"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
            </div>
            <Card className="border-border bg-card shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <CouponMemberTableHeader />
                        <CouponMemberTableBody
                            loading={loading}
                            coupons={coupons}
                            onRefresh={fetchCoupons}
                        />
                    </Table>

                    {!loading && coupons.length === 0 && (
                        <div className="py-12 text-center text-muted-foreground">
                            No coupons found.
                        </div>
                    )}
                </CardContent>
            </Card>

            {totalItems > 0 && (
                <div className="flex items-center justify-between px-4 py-4 border rounded-xl bg-card my-4">
                    <p className="text-xs text-muted-foreground">
                        Total <span className="font-bold text-foreground">{totalItems}</span> coupons
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage(prev => prev - 1)}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                        </Button>
                        <span className="text-xs font-medium">
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === totalPages}
                            onClick={() => setPage(prev => prev + 1)}
                        >
                            Next <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}