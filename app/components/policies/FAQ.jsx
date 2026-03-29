import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Card, CardContent } from "../ui/card";

export default function FAQ() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl mt-20">
      <Card>
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold mb-4">
            Frequently Asked Questions (FAQ)
          </h1>

          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>What is RunRise Nation?</AccordionTrigger>
              <AccordionContent>
                RunRise Nation is a community-driven endurance and fitness
                organization organizing running events, cycling challenges,
                training, and community activities.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2">
              <AccordionTrigger>Are events beginner friendly?</AccordionTrigger>
              <AccordionContent>
                Yes! Our events are designed for beginners and experienced
                athletes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3">
              <AccordionTrigger>
                How can I contact RunRise Nation?
              </AccordionTrigger>
              <AccordionContent>
                📧 contact.runrisenation@gmail.com <br />
                📱 Social Media DMs
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
