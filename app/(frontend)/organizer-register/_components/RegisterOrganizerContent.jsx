"use client"
import OrganizerRegModal from "@/app/components/pages/register/components/OrganizerRegModal";
import { useState } from "react";

export default function RegisterOrganizerContent() {
  const [agree, setAgree] = useState(false);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5">
        <div className="max-w-3xl">

          {/* Title */}
          <h1 className="text-dark font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">
            Register as Organizer
          </h1>

          {/* Intro */}
          <h3 className="text-brand font-semibold text-lg mb-2">
            Partner with RunRise Nation
          </h3>

          <p className="text-gray text-sm sm:text-base leading-relaxed mb-6">
            Join RunRise Nation as an official event organizer and bring your
            running events to a larger audience. Whether you're managing
            marathons, community runs, or fitness campaigns — we help you grow,
            manage, and scale your events professionally.
          </p>

          {/* Why Join */}
          <h4 className="text-dark font-semibold text-lg mb-3">
            Why Register as an Organizer?
          </h4>

          <ul className="space-y-3 text-gray text-sm sm:text-base mb-6 list-disc pl-5">
            <li>
              <strong className="text-dark">Expand Your Reach:</strong> Get access
              to a large and active running community.
            </li>
            <li>
              <strong className="text-dark">Easy Event Management:</strong> Manage
              registrations, participants, and payments from one platform.
            </li>
            <li>
              <strong className="text-dark">Secure Payments:</strong> Integrated
              payment system with seamless transactions.
            </li>
            <li>
              <strong className="text-dark">Brand Visibility:</strong> Showcase
              your organization and grow your credibility.
            </li>
          </ul>

          {/* Required Info */}
          <h4 className="text-dark font-semibold text-lg mb-3">
            What You Need to Provide
          </h4>

          <ul className="space-y-3 text-gray text-sm sm:text-base mb-6 list-disc pl-5">
            <li>Organization Name, Type, and Registration Number</li>
            <li>Primary Representative Details</li>
            <li>Official Email & Phone Number</li>
            <li>Office Address & Social Media Link</li>
            <li>Event Experience (Total Events & Participants)</li>
            <li>Bank Details for Payment Settlement</li>
            <li>Required Documents (Logo, NID/Passport, Company Profile)</li>
          </ul>

          {/* Process */}
          <h4 className="text-dark font-semibold text-lg mb-3">
            Registration Process
          </h4>

          <ul className="space-y-3 text-gray text-sm sm:text-base mb-6 list-disc pl-5">
            <li>Fill out the organizer registration form</li>
            <li>Upload required documents</li>
            <li>Wait for admin approval</li>
            <li>Start creating and managing your events</li>
          </ul>

          {/* Motivation */}
          <p className="text-gray text-sm sm:text-base leading-relaxed mb-8">
            Become a part of a growing ecosystem where organizers and runners
            connect seamlessly. Let’s build impactful running events together.
          </p>

          {/* Terms */}
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

          {/* Form */}
          {/* <RegistrationForm agree={agree} /> */}
          <OrganizerRegModal agree={agree} />

        </div>
      </div>
    </section>
  );
}