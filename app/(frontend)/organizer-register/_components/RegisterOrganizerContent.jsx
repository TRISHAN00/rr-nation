"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import OrganizerRegModal from "@/app/components/pages/register/components/OrganizerRegModal";
import { getMyOrganizerRegistration } from "@/services/organizer.service";
import OrganizerStatusCard from "./OrganizerStatusCard";

export default function RegisterOrganizerContent() {
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(true);
  const [registration, setRegistration] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    getMyOrganizerRegistration()
      .then((res) => {
        if (!active) return;
        const data = res?.data || null;
        setRegistration(data);
        if (String(data?.adminApproval || "").toLowerCase() === "approved") {
          router.replace("/organizer/dashboard");
        }
      })
      .catch(() => {
        if (active) setRegistration(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [router]);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-7.5 flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  if (registration) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-7.5 max-w-5xl">
          <OrganizerStatusCard registration={registration} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5">
        <div className="max-w-3xl">
          <h1 className="text-dark font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">
            Register as Organizer
          </h1>
          <h3 className="text-brand font-semibold text-lg mb-2">Partner with RunRise Nation</h3>
          <p className="text-gray text-sm sm:text-base leading-relaxed mb-6">
            Join RunRise Nation as an official event organizer and bring your running events to a larger
            audience. Whether you're managing marathons, community runs, or fitness campaigns — we help you
            grow, manage, and scale your events professionally.
          </p>

          <h4 className="text-dark font-semibold text-lg mb-3">Why Register as an Organizer?</h4>
          <ul className="space-y-3 text-gray text-sm sm:text-base mb-6 list-disc pl-5">
            <li><strong className="text-dark">Expand Your Reach:</strong> Get access to a large and active running community.</li>
            <li><strong className="text-dark">Easy Event Management:</strong> Manage registrations, participants, and payments from one platform.</li>
            <li><strong className="text-dark">Secure Payments:</strong> Integrated payment system with seamless transactions.</li>
            <li><strong className="text-dark">Brand Visibility:</strong> Showcase your organization and grow your credibility.</li>
          </ul>

          <h4 className="text-dark font-semibold text-lg mb-3">What You Need to Provide</h4>
          <ul className="space-y-3 text-gray text-sm sm:text-base mb-6 list-disc pl-5">
            <li>Organization Name, Type, and Registration Number</li>
            <li>Primary Representative Details</li>
            <li>Official Email & Phone Number</li>
            <li>Office Address & Social Media Link</li>
            <li>Event Experience (Total Events & Participants)</li>
            <li>Bank Details for Payment Settlement</li>
            <li>Required Documents (Logo, NID/Passport, Company Profile)</li>
          </ul>

          <h4 className="text-dark font-semibold text-lg mb-3">Registration Process</h4>
          <ul className="space-y-3 text-gray text-sm sm:text-base mb-6 list-disc pl-5">
            <li>Fill out the organizer registration form</li>
            <li>Upload required documents</li>
            <li>Wait for admin approval</li>
            <li>Start creating and managing your events</li>
          </ul>

          <p className="text-gray text-sm sm:text-base leading-relaxed mb-8">
            Become a part of a growing ecosystem where organizers and runners connect seamlessly. Let’s build impactful running events together.
          </p>

          <div className="flex items-center gap-2 mb-8">
            <input
              type="checkbox"
              id="terms"
              onChange={(e) => setAgree(e.target.checked)}
              checked={agree}
              className="accent-brand cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-gray cursor-pointer">
              I agree with terms and conditions
            </label>
          </div>

          <OrganizerRegModal agree={agree} />
        </div>
      </div>
    </section>
  );
}