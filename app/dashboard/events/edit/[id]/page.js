"use client";

import { useParams } from "next/navigation";

import { useDashboardEvents } from "@/app/dashboard/context/EventContext";
import { useEffect } from "react";
import EventCouponManager from "../../_components/EventCouponManager";
import EventInfoForm from "../../create/_components/EventInfoForm";
import EventTickets from "../../create/_components/EventTickets";
import EventTshirt from "../../create/_components/EventTshirt";

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

      {/* Couponse */}
      <EventCouponManager event={event} />

      {/* 5. Pass the ID to the sub-components */}
      <EventTickets eventId={id} />
      <EventTshirt eventId={id} />
    </div>
  );
}
