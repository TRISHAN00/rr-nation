"use client";

import { useState } from "react";
import CouponList from "../_components/coupon/CouponList";
import EventInfoForm from "./_components/EventInfoForm";
import EventTickets from "./_components/EventTickets";
import { RegistrationFormSettings } from "./_components/RegistrationFormSettings";

export default function EventCreatePage() {
  const [eventId, setEventId] = useState(null);

  return (
    <div className=" space-y-8">
      {/* 1. Base Event Info */}
      <EventInfoForm onEventCreated={(id) => setEventId(id)} />

      {/* Event Coupons */}

      {/* 2. Successive Steps (Unlocked after ID exists) */}
      {eventId && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
          <CouponList eventId={eventId} />
          <EventTickets eventId={eventId} />
          {/* <EventTshirt eventId={eventId} /> */}
          <RegistrationFormSettings eventId={eventId} />
        </div>
      )}
    </div>
  );
}
