import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "../ui/card";

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl mt-20">
      <Card>
        <CardContent className="pt-6 space-y-6 leading-relaxed">
          <h1 className="text-3xl font-bold text-brand">
            Return & Refund Policy
          </h1>
          <p className="text-gray-600 italic">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-800">
              Event Registration
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                All event registration fees are non-refundable and
                non-transferable once registration is confirmed.
              </li>
              <li>
                If RunRise Nation cancels an event, participants will be
                eligible for a refund or alternative option.
              </li>
              <li>
                If an event is rescheduled and a participant cannot attend,
                refund requests must be submitted within{" "}
                <strong>7–10 working days</strong>.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-800">
              Merchandise & Product Purchases
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Defective or incorrect items must be reported within 7 days.
              </li>
              <li className="bg-teal-50 p-2 rounded border-l-4 border-[#00a19a]">
                <strong>Standard Timeline:</strong> Approved refunds will be
                processed within <strong>7–10 working days</strong>.
              </li>
              <li>
                Items damaged due to misuse or normal wear are not eligible.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-800">
              Refund Request Process
            </h2>
            <p className="mb-2">
              To initiate a refund, please provide the following:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full Name</li>
              <li>Registration ID / Order ID</li>
              <li>Event or Product Name</li>
              <li>Reason for refund or return</li>
              <li>Supporting photos (if applicable)</li>
            </ul>
            <p className="mt-4 font-medium flex items-center gap-2 text-brand">
              <span>📧</span> contact.runrisenation@gmail.com
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-800">
              Delivery Information
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Inside Dhaka:</strong> Delivery within 5 working days
              </li>
              <li>
                <strong>Outside Dhaka:</strong> Delivery within 10 working days
              </li>
            </ul>
          </section>

          <Separator />

          <section className="bg-slate-50 p-6 rounded-lg border border-slate-100">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">
              Contact Information
            </h2>
            <div className="space-y-3">
              <p className="flex items-center gap-2 font-medium">
                <span className="text-brand">📞</span> +8801889996700
              </p>
              <p className="flex items-center gap-2 font-medium">
                <span className="text-brand">📧</span>{" "}
                contact.runrisenation@gmail.com
              </p>
              <p className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-brand mt-1">📍</span>
                House 91/B, Fulkoli Mor, Section-12, Block B, Road 1, Kalshi
                Road, Pallabi, Dhaka-1216
              </p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
