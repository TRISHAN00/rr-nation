import InnerBanner from "@/app/components/common/InnerBanner";
import Blogs from "@/app/components/pages/blogs/Blogs";
import { getApi } from "../api/page-api";

export const metadata = {
  title: "Running Insights & Stories | RunRise Nation Blog",
  description: "Get the latest marathon training tips, runner stories, and fitness advice from the RunRise Nation community. Stay updated on running events in Bangladesh.",
  keywords: ["Running Tips Bangladesh", "Marathon Training Advice", "RunRise Nation Blog", "Fitness Articles", "Athlete Stories Dhaka"],
  openGraph: {
    title: "RunRise Nation Blog - Elevate Your Running Journey",
    description: "Expert advice and inspiring stories from the heart of the Bangladesh running community.",
    url: "https://runrisenation.com/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const apiValue = "blogs";
  const eventData = await getApi(apiValue);

  const bannerData = eventData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "blogs-banner"
  );

  return (
    <>
      <InnerBanner
        title={bannerData?.section_data?.subtitle}
        background={bannerData?.images?.list?.[0]?.full_path}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blogs" }]}
      />
      <Blogs hideBtnArrow />
    </>
  );
}
