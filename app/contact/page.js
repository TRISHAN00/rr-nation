import InnerBanner from "@/components/common/InnerBanner";
import ContactInfo from "@/components/pages/contact/ContactInfo";
import ContactMapForm from "@/components/pages/contact/ContactMapForm";

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
