"use client";

import api from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Fetch Coupons for a specific event
export const useCoupons = (eventId) => {
  return useQuery({
    queryKey: ["coupons", eventId],
    queryFn: async () => {
      const res = await api.get(`/admin/discount-coupon/${eventId}`);
      return res?.data || [];
    },
    enabled: !!eventId,
  });
};

// Create Coupon
export const useCreateCoupon = (eventId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post(`/admin/discount-coupon`, [{ ...data, eventId }]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons", eventId] });
      toast.success("Coupon created!");
    },
    onError: (err) => toast.error(err?.response?.data?.message || "Error creating coupon"),
  });
};

// Delete Coupon (Assuming the API takes the code or an ID)
export const useDeleteCoupon = (eventId) => {
  const queryClient = useQueryClient();

  return useMutation({
    // Now using the specific ID from your new endpoint structure
    mutationFn: (discountCouponId) => 
      api.delete(`/admin/discount-coupon/${discountCouponId}`),
    
    onSuccess: () => {
      // Invalidate the coupons for this specific event to refresh the list
      queryClient.invalidateQueries({ queryKey: ["coupons", eventId] });
      toast.success("Coupon deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete coupon");
    }
  });
};