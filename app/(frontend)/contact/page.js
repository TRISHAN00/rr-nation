import InnerBanner from "@/app/components/common/InnerBanner";
import ContactInfo from "@/app/components/pages/contact/ContactInfo";
import ContactMapForm from "@/app/components/pages/contact/ContactMapForm";

export const metadata = {
  title: "Contact Us | Connect with RunRise Nation",
  description: "Have questions about our upcoming marathons or membership? Get in touch with RunRise Nation. We are here to help you start your fitness journey in Bangladesh.",
  keywords: ["Contact RunRise Nation", "RRN Bangladesh Support", "Join Running Community Dhaka", "Running Event Inquiries"],
  openGraph: {
    title: "Contact RunRise Nation - Get in Touch",
    description: "Reach out to the RunRise Nation team for event details, sponsorships, or membership queries.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <InnerBanner
        title="Contact"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <ContactInfo/>
      <ContactMapForm/>
    </>
  );
}
