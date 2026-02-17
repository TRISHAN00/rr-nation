"use client";

import { Calendar, Clock, MapPin, Ticket, X } from "lucide-react";
import Image from "next/image";

export default function AddToCartModal({ open = true }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Header Image */}
        <div className="relative h-48 w-full bg-muted">
          <Image
            src="https://api.runrisenation.com/media/Cover-01.jpg.jpeg"
            alt="Event banner"
            fill
            className="object-cover"
          />

          <button className="absolute top-4 right-4 rounded-full bg-black/60 p-2 text-white hover:bg-black/80">
            <X className="h-4 w-4" />
          </button>

          {/* Event Type Badge */}
          <span className="absolute left-4 bottom-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
            LIVE EVENT
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Title */}
          <h3 className="text-xl font-bold leading-snug">
            Dhaka Marathon 2026
          </h3>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>15 March 2026</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>06:00 AM</span>
            </div>

            <div className="col-span-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Hatirjheel, Dhaka</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t" />

          {/* Package Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">
              Select Package
            </h4>

            {/* Package Card */}
            <button className="w-full rounded-2xl border p-4 flex items-center justify-between hover:border-primary hover:bg-primary/5 transition">
              <div className="flex items-center gap-3">
                <Ticket className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Standard Package</p>
                  <p className="text-xs text-muted-foreground">
                    Includes race kit & medal
                  </p>
                </div>
              </div>

              <span className="text-lg font-bold">
                ৳1500
              </span>
            </button>

            {/* Empty State */}
            
            <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
              No packages available for this event
            </div>
           
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 border-t px-6 py-4 bg-muted/40">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold">৳1500</p>
          </div>

          <button className="rounded-xl bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
