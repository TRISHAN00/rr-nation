import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "../ui/card";

export default function PrivacyPolicy() {
  return (
    <Card className="max-w-5xl mx-auto">
      <CardContent className="pt-6 space-y-6 leading-relaxed text-sm sm:text-base">
        {/* Trade License */}
        <p className="text-xs sm:text-sm text-muted-foreground">
          Trade License Number: TRAD/DNCC/023534/2025
        </p>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold">Privacy Policy</h1>

        {/* Introduction */}
        <p>
          At RunRise Nation (RRN), we respect and value the trust you place in
          us. Protecting your personal information is a priority, and this
          Privacy Policy explains how we collect, use, store, and safeguard your
          data when you interact with our website, events, and services.
        </p>
        <p>
          By using our website or participating in RunRise Nation activities,
          you agree to the practices described in this policy.
        </p>

        <Separator />

        {/* Information We Collect */}
        <h2 className="text-xl sm:text-2xl font-semibold">
          Information We Collect
        </h2>
        <p>
          We may collect the following types of information to ensure smooth
          event operations and a better community experience:
        </p>

        <ul className="list-disc pl-5 sm:pl-6 space-y-2">
          <li>
            <strong>Personal Information:</strong> Name, age, gender, date of
            birth, emergency contact details (during event registration).
          </li>
          <li>
            <strong>Contact Information:</strong> Email address, phone number,
            and mailing address.
          </li>
          <li>
            <strong>Payment Information:</strong> Details required to process
            registration fees, merchandise purchases, or donations (handled
            securely via trusted payment gateways).
          </li>
          <li>
            <strong>Health & Safety Information:</strong> Limited information
            relevant to participant safety during endurance events.
          </li>
          <li>
            <strong>Website Usage Data:</strong> Non-personal data collected
            through cookies and analytics tools to understand user behavior and
            improve website performance.
          </li>
        </ul>

        <Separator />

        {/* How We Use Your Information */}
        <h2 className="text-xl sm:text-2xl font-semibold">
          How We Use Your Information
        </h2>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2">
          <li>
            To process event registrations and manage participant records.
          </li>
          <li>
            To communicate event updates, schedules, results, and important
            announcements.
          </li>
          <li>
            To enhance participant safety and emergency response during events.
          </li>
          <li>
            To improve our website, services, and overall community experience.
          </li>
          <li>
            To share relevant updates, offers, or initiatives related to RunRise
            Nation (you may opt out anytime).
          </li>
        </ul>

        <Separator />

        {/* Data Sharing */}
        <h2 className="text-xl sm:text-2xl font-semibold">
          Data Sharing & Disclosure
        </h2>
        <p>
          RunRise Nation does not sell, trade, or misuse your personal data.
        </p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2">
          <li>
            With trusted partners involved in event operations (e.g., payment
            processors, timing partners, logistics teams).
          </li>
          <li>When required by law, regulation, or legal process.</li>
          <li>
            To protect the rights, safety, and integrity of participants,
            volunteers, and the RunRise Nation community.
          </li>
        </ul>
        <p>
          All partners are expected to uphold strict data protection standards.
        </p>

        <Separator />

        {/* Data Security */}
        <h2 className="text-xl sm:text-2xl font-semibold">Data Security</h2>
        <p>
          We take appropriate technical and organizational measures to safeguard
          your information against unauthorized access, loss, or misuse.
        </p>
        <p>
          While we strive to protect your data, no digital platform can
          guarantee 100% security.
        </p>

        <Separator />

        {/* Your Rights */}
        <h2 className="text-xl sm:text-2xl font-semibold">Your Rights</h2>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2">
          <li>Access your personal information.</li>
          <li>Request corrections or updates to your data.</li>
          <li>
            Request deletion of your personal data, subject to legal or
            operational requirements.
          </li>
        </ul>
        <p className="font-medium mt-2">📧 contact.runrisenation@gmail.com</p>

        <Separator />

        <p className="text-xs sm:text-sm text-muted-foreground">
          Last Update: February 2026
        </p>
      </CardContent>
    </Card>
  );
}
