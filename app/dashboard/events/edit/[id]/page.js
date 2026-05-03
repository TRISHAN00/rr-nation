"use client";

import { useParams } from "next/navigation";

import { useDashboardEvents } from "@/app/dashboard/context/EventContext";
import { useEffect } from "react";
import CouponList from "../../_components/coupon/CouponList";
import EventInfoForm from "../../create/_components/EventInfoForm";
import EventTickets from "../../create/_components/EventTickets";

export default function DashboardEventEdit() {
  const { id } = useParams();

   const {
     handleGetEventById,
     event,
   } = useDashboardEvents();
 
   useEffect(() => {
     if (id) {
       handleGetEventById(id);
     }
   }, [id, handleGetEventById]);

  return (
    <div className="space-y-6">
      {/* 4. Pass the event data to the form */}
      <EventInfoForm event={event} />

      {/* Coupone List */}
      <CouponList eventId={id} />

      {/* Pass the ID to the sub-components */}
      <EventTickets eventId={id} />
      {/* <EventTshirt eventId={id} /> */}
    </div>
  );
}
