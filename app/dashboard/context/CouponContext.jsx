"use client";

import {
  createEventCoupon,
  deleteCoupon,
  getAllDashboardCoupons,
} from "@/services/admin/admin.event.coupon.service";
import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "sonner";

const CouponContext = createContext(null);

export function CouponProvider({ children, eventId }) {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1); // Added totalPages state

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllDashboardCoupons(currentPage, itemsPerPage);
      
      // Assuming your API returns items and total pages/count
      setCoupons(res?.data?.items || []);
      setTotalPages(res?.data?.totalPages || 1); 
    } catch (err) {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]); // Removed eventId from deps if not used in API call

  const handleCreateCoupon = async (couponData) => {
    try {
      setIsProcessing(true);
      const dataToSend = Array.isArray(couponData)
        ? couponData.map((c) => ({
            ...c,
            eventId: Number(eventId || c.eventId),
          }))
        : { ...couponData, eventId: Number(eventId || couponData.eventId) };

      await createEventCoupon(dataToSend);
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
        // Added these to the provider value:
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        totalPages
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