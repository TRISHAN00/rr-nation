"use client";
import { useState } from "react";
import EventInfoForm from "./_components/EventInfoForm";
import EventPackages from "./_components/EventTickets";
import { RegistrationFormSettings } from "./_components/RegistrationFormSettings";
import { TShirtSizeManager } from "./_components/TShirtSizeManager";

export default function EventCreatePage() {
  const [eventId, setEventId] = useState(null);

  return (
    <>
      <EventInfoForm onEventCreated={setEventId} />
      {/* Only render other components after eventId is available */}
      {eventId && (
        <>
          <EventPackages eventId={eventId} />
          <TShirtSizeManager eventId={eventId} />
          <RegistrationFormSettings eventId={eventId} />
        </>
      )}
    </>
  );
}
