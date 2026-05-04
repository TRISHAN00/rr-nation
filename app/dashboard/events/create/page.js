"use client";

import { useState } from "react";
import CouponList from "../_components/coupon/CouponList";
import EvRegFormFieldList from "../_components/regFormFields/EvRegFormFieldList";
import EvTicketList from "../_components/ticket/EvTicketList";
import EventInfoForm from "./_components/EventInfoForm";

export default function EventCreatePage() {
  const [eventId, setEventId] = useState(null);

  return (
    <div className=" space-y-8">
      {/* 1. Base Event Info */}
      <EventInfoForm onEventCreated={(id) => setEventId(id)} />
      <CouponList eventId={eventId} />
      <EvRegFormFieldList eventId={eventId}  />
      <EvTicketList eventId={eventId} />
     
    </div>
  );
}
