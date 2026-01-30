import InnerBanner from "@/components/common/InnerBanner";
import Blogs from "@/components/pages/blogs/Blogs";

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

export default function BlogPage() {
  return (
    <>
      <InnerBanner
        title="Blogs"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blogs" }]}
      />
      <Blogs hideBtnArrow />
    </>
  );
}
