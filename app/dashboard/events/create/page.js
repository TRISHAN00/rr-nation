"use client";

import { useState } from "react";
import EventInfoForm from "./_components/EventInfoForm";
import EventTickets from "./_components/EventTickets";
import EventTshirt from "./_components/EventTshirt";
import { RegistrationFormSettings } from "./_components/RegistrationFormSettings";

export default function EventCreatePage() {
  const [eventId, setEventId] = useState(null);

  return (
    <div className=" space-y-8">
      {/* 1. Base Event Info */}
      <EventInfoForm onEventCreated={(id) => setEventId(id)} />

      {/* 2. Successive Steps (Unlocked after ID exists) */}
      {eventId && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
          <EventTickets eventId={eventId} />
          <EventTshirt eventId={eventId} />
          <RegistrationFormSettings eventId={eventId} />
        </div>
      )}
    </div>
  );
}
