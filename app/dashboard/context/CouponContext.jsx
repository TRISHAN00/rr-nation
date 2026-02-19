"use client";

import {
  createCoupon,
  deleteCoupon,
  getAllDashboardCoupons,
} from "@/services/admin/coupon.service";
import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "sonner";

const CouponContext = createContext(null);

export function CouponProvider({ children, eventId }) {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllDashboardCoupons();
      setCoupons(res?.data?.items);
    } catch (err) {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  const handleCreateCoupon = async (couponData) => {
    try {
      setIsProcessing(true);

      // FIX: If couponData is an array, map through it to ensure eventId is present
      // If it's a single object, just attach the eventId.
      const dataToSend = Array.isArray(couponData)
        ? couponData.map((c) => ({
            ...c,
            eventId: Number(eventId || c.eventId),
          }))
        : { ...couponData, eventId: Number(eventId || couponData.eventId) };

      await createCoupon(dataToSend);

      toast.success("Coupon created");
      await fetchCoupons();
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error creating coupon");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteCoupon = async (id) => {
    try {
      setIsProcessing(true);
      await deleteCoupon(id);
      toast.success("Coupon deleted");
      await fetchCoupons();
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <CouponContext.Provider
      value={{
        coupons,
        loading,
        isProcessing,
        fetchCoupons,
        handleCreateCoupon,
        handleDeleteCoupon,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}

export const useCoupons = () => {
  const context = useContext(CouponContext);
  if (!context)
    throw new Error("useCoupons must be used within CouponProvider");
  return context;
};
