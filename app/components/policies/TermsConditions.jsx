import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Card, CardContent } from "../ui/card";

export default function TermsConditions() {
  return (
    <Card>
      <CardContent className="pt-6">
        <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>

        <Accordion type="multiple">
          <AccordionItem value="registration">
            <AccordionTrigger>Event Registration & Participation</AccordionTrigger>
            <AccordionContent>
              All registrations must be completed through official platforms.
              Registration is confirmed after successful payment and is
              non-refundable except as outlined in the Return & Refund Policy.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="health">
            <AccordionTrigger>Eligibility & Health Responsibility</AccordionTrigger>
            <AccordionContent>
              Participants must ensure they are physically fit and participate
              at their own risk. Medical consultation is strongly recommended.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="safety">
            <AccordionTrigger>Safety, Rules & Conduct</AccordionTrigger>
            <AccordionContent>
              Participants must follow all event rules. Unsafe behavior,
              shortcuts, or unauthorized assistance may result in disqualification.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="liability">
            <AccordionTrigger>Liability Disclaimer</AccordionTrigger>
            <AccordionContent>
              RunRise Nation shall not be held liable for injury, illness, loss,
              or damage arising before, during, or after events.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="law">
            <AccordionTrigger>Governing Law</AccordionTrigger>
            <AccordionContent>
              These terms are governed by the laws of Bangladesh, and disputes
              fall under Bangladeshi jurisdiction.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
