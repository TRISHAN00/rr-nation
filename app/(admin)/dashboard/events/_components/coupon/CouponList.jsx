import { Card, CardContent } from "@/app/components/ui/card";
import { Table } from "@/app/components/ui/table";
import { getCouponsByEventId } from "@/services/admin/admin.event.coupon.service";
import { useEffect, useState } from "react";
import CouponEventPageHeader from "./CouponEventPageHeader";
import CouponEventTableBody from "./CouponEventTableBody";
import CouponEventTableHeader from "./CouponEventTableHeader";

export default function CouponList({ eventId }) {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCoupons = async () => {
        try {
            setLoading(true);
            const res = await getCouponsByEventId(eventId);
            setCoupons(res?.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, [eventId]);

    return (
        <>
            <CouponEventPageHeader onCoupons={fetchCoupons} eventId={eventId} />

            <Card className={`border-border bg-card shadow-sm overflow-hidden`} >
                <CardContent className="p-0">
                    <Table>
                        {/* HEADER */}
                        <CouponEventTableHeader />

                        {/* BODY */}
                        <CouponEventTableBody
                            loading={loading}
                            coupons={coupons}
                            eventId={eventId}
                            onRefresh={fetchCoupons}
                        />

                        {/* EMPTY STATE - FIXED NESTING */}
                        {!loading && coupons.length === 0 && (
                            <tbody>
                                <tr>
                                    <td colSpan={100} className="py-12 text-center text-muted-foreground">
                                        No coupons found.
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}
