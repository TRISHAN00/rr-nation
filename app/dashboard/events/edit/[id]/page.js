"use client";

import { useParams } from "next/navigation";

import { useDashboardEvents } from "@/app/dashboard/context/EventContext";
import { useEffect } from "react";
import CouponList from "../../_components/coupon/CouponList";
import EvRegFormFieldList from "../../_components/regFormFields/EvRegFormFieldList";
import EvTicketList from "../../_components/ticket/EvTicketList";
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
      {/* Pass the event data to the form */}
      <EventInfoForm event={event} />

      {/* Coupone List */}
      <CouponList eventId={id} />

      {/* Event Registration Form Fields */}
      <EvRegFormFieldList eventId={id} />

      {/* Event Tickets */}
      <EvTicketList eventId={id} />

      <EventTickets eventId={id} />
    </div>
  );
}
