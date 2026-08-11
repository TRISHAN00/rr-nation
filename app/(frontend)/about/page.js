import Counter from "@/app/components/common/counter/Counter";
import InnerBanner from "@/app/components/common/InnerBanner";
import OurMission from "@/app/components/pages/about/OurMission";
import Team from "@/app/components/pages/team/FeatureTeamSlide";
import { getApi } from "../api/page-api";

export const metadata = {
  title: "About Us | The Heart of RunRise Nation",
  description:
    "Learn about RunRise Nation's mission to transform fitness in Bangladesh. Meet our dedicated team of marathon enthusiasts and discover our journey toward becoming an AIMS-associate community.",
  keywords: [
    "About RunRise Nation",
    "RRN Team",
    "Bangladesh Running Founders",
    "RunRise Mission",
    "Fitness Leadership Bangladesh",
  ],
  openGraph: {
    title: "About RunRise Nation - Our Mission & Team",
    description:
      "Discover the story behind Bangladesh's most active running community. Meet the people making it happen.",
    type: "website",
  },
};

export default async function AboutPage() {
  const apiValue = "about";
  const apiHomeValue = "home";
  const aboutData = await getApi(apiValue);
  const homeData = await getApi(apiHomeValue);

  const bannerData = aboutData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "about-banner"
  );

  const aboutOurMission = aboutData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "about-our-mission"
  );

  const statsCounterData = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "stats-counter"
  );

  const featureTeam = aboutData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "feature-team"
  );

  return (
    <>
      <InnerBanner
        title={bannerData?.section_data?.subtitle}
        background={bannerData?.images?.list?.[0]?.full_path}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <OurMission hideIcon hideBtn hideShape hideRound  data={aboutOurMission}/>
      <Counter data={statsCounterData} />
      <Team data={featureTeam} hideSearch />
    </>
  );
}
