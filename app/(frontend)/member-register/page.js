import InnerBanner from "@/app/components/common/InnerBanner";
import RegisterMemberContent from "@/app/components/pages/register/RegisterMemberContent";

export const metadata = {
  title: "Join the Movement | Register for RunRise Nation",
  description: "Become a member of RunRise Nation today. Join Bangladesh's premier running community, get access to exclusive training sessions, and register for upcoming AIMS-associate marathons.",
  keywords: ["Join RunRise Nation", "Running Club Membership Bangladesh", "Register for Marathon Dhaka", "RRN Member Sign Up", "Fitness Community Registration"],
  openGraph: {
    title: "Register for RunRise Nation - Run and Rise Together",
    description: "Start your fitness journey with the most active running community in Bangladesh. Sign up now!",
    type: "website",
    images: [
      {
        url: "/dynamic/about/inner-banner.jpg", 
        width: 1200,
        height: 630,
        alt: "Join the RunRise Nation Community",
      },
    ],
  },
};

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
