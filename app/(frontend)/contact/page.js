import InnerBanner from "@/app/components/common/InnerBanner";
import ContactInfo from "@/app/components/pages/contact/ContactInfo";
import ContactMapForm from "@/app/components/pages/contact/ContactMapForm";
import { getApi } from "../api/page-api";

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

export default async function ContactPage() {
  const apiValue = "contact";
  const contactData = await getApi(apiValue);

  const bannerData = contactData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "contact-banner"
  );

  return (
    <>
      <InnerBanner
        title={bannerData?.section_data?.subtitle}
        background={bannerData?.images?.list?.[0]?.full_path}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <ContactInfo />
      <ContactMapForm />
    </>
  );
}
