import InnerBanner from "@/components/common/InnerBanner";
import RegisterMemberContent from "@/components/pages/register/RegisterMemberContent";

export default function RegisterPage() {
  return (
    <>
      <InnerBanner
        title="Register"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Register" }]}
      />
      <RegisterMemberContent />
    </>
  );
}
