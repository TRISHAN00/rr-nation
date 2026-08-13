import InnerBanner from "@/app/components/common/InnerBanner";
import Team from "@/app/components/pages/team/Team";
import { getApi } from "../api/page-api";

export const metadata = {
  title: "Meet the Team | The Leaders of RunRise Nation",
  description: "Get to know the dedicated individuals leading RunRise Nation. Our team of experienced runners, coaches, and organizers is committed to building a healthier Bangladesh.",
  keywords: [
    "RunRise Nation Team",
    "RRN Founders",
    "Running Coaches Bangladesh",
    "Marathon Organizers Dhaka",
    "RRN Leadership",
    "Fitness Experts Bangladesh"
  ],
  openGraph: {
    title: "The Faces of RunRise Nation - Our Team",
    description: "Meet the passionate team driving the running revolution in Bangladesh. Dedicated to helping you rise.",
    type: "website",
    images: [
      {
        url: "/dynamic/about/inner-banner.jpg",
        width: 1200,
        height: 630,
        alt: "RunRise Nation Leadership Team",
      },
    ],
  },
};

export default async function TeamPage() {
  const apiValue = "team";
  const teamData = await getApi(apiValue);

  const bannerData = teamData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "team-banner"
  );

  const membersTitle = teamData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "team-list"
  );

  return (
    <>
      <InnerBanner
        title={bannerData?.section_data?.subtitle}
        background={bannerData?.images?.list?.[0]?.full_path}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Team" }]}
      />
      <Team membersTitle={membersTitle} />
    </>
  );
}
