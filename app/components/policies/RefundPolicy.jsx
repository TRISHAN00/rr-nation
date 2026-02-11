import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "../ui/card";

export default function RefundPolicy() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6 leading-relaxed">
        <h1 className="text-2xl font-bold">Return & Refund Policy</h1>

        <h2 className="text-xl font-semibold">Event Registration</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            All event registration fees are non-refundable and non-transferable
            once registration is confirmed.
          </li>
          <li>
            If RunRise Nation cancels an event, participants will be eligible for
            a refund or alternative option.
          </li>
          <li>
            If an event is rescheduled and a participant cannot attend, refund
            requests must be submitted within 7–10 working days.
          </li>
        </ul>

        <Separator />

        <h2 className="text-xl font-semibold">
          Merchandise & Product Purchases
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Defective or incorrect items must be reported within 7 days.
          </li>
          <li>
            Approved refunds will be processed within 7–10 working days.
          </li>
          <li>
            Items damaged due to misuse or normal wear are not eligible.
          </li>
        </ul>

        <Separator />

        <h2 className="text-xl font-semibold">Refund Request Process</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Full Name</li>
          <li>Registration ID / Order ID</li>
          <li>Event or Product Name</li>
          <li>Reason for refund or return</li>
          <li>Supporting photos (if applicable)</li>
        </ul>

        <p className="font-medium">📧 contact.runrisenation@gmail.com</p>

        <Separator />

        <h2 className="text-xl font-semibold">Delivery Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Inside Dhaka: Delivery within 5 working days</li>
          <li>Outside Dhaka: Delivery within 10 working days</li>
        </ul>

        <Separator />

        <h2 className="text-xl font-semibold">Contact Information</h2>
        <p>📞 +8801889996700</p>
        <p>📧 contact.runrisenation@gmail.com</p>
        <p>
          📍 House 01, Road 06, Block E, Extended Rupnagar R/A, Section-12,
          Pallabi, Mirpur, Dhaka-1216.
        </p>
      </CardContent>
    </Card>
  );
}
