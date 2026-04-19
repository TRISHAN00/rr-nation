import InnerBanner from "@/app/components/common/InnerBanner";
import RegisterOrganizerContent from "./_components/RegisterOrganizerContent";

export default function OrganizerRegistration() {
  return (
    <>
      <InnerBanner
        title="Organizer Register"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Organizer Register" }]}
      />
      <RegisterOrganizerContent/>
    </>
  )
}
