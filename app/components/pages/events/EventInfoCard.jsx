"use client";

import HeaderSocial from "@/app/components/common/header/HeaderSocial";
import Image from "next/image";

export default function EventInfoCard({ event }) {
  if (!event) return null;

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-[#E6FAF8] rounded-3xl p-6 sm:p-8 w-full space-y-6">
      <div>
        <p className="text-sm text-gray-500 mb-1">Event:</p>
        <p className="font-semibold text-dark text-lg">{event?.name}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-1">Location & Date:</p>
        <p className="font-semibold text-dark">
          {event?.address} <br />
          {formatDate(event?.date)} | {event?.time}
        </p>
      </div>

      <ul className="space-y-4">
        <li>
          <p className="text-sm text-gray-500 mb-1">Event Status:</p>
          <p className="font-semibold text-dark">{event?.status}</p>
        </li>

        <li>
          <p className="text-sm text-gray-500 mb-1">Organizer:</p>
          <p className="font-semibold text-dark">{event?.organizerName}</p>
        </li>

        <li>
          <p className="text-sm text-gray-500 mb-1">Race Packages:</p>
          <ul className="list-disc list-inside space-y-1">
            {event?.packages?.map((pkg) => (
              <li key={pkg.id}>
                {pkg.distance} – {pkg.price} BDT ({pkg.availableSlots} slots)
              </li>
            ))}
          </ul>
        </li>
      </ul>

      <div className="space-y-2">
        <p className="text-sm text-gray-500 mb-1">Payment Methods:</p>
        <div className="flex gap-2">
          <Image
            src={"/static/all-pgw.jpg"}
            height={50}
            width={250}
            alt="payment gateway"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-500 mb-1">Share on Socials:</p>
        <div className="flex gap-2">
          <HeaderSocial bgColor="#00A19A" size={36} gap={2} />
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-xl">
        <Image
          src={event?.bannerImage}
          alt={event?.name}
          width={800}
          height={300}
          className="object-cover w-full h-auto"
        />
      </div>
    </div>
  );
}
