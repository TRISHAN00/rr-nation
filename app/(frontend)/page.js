import Counter from "@/app/components/common/counter/Counter";
import TestimonialSec from "@/app/components/common/testimonial/TestimonialSec";
import OurMission from "@/app/components/pages/about/OurMission";
import FeaturedBlogSlide from "@/app/components/pages/blogs/FeaturedBlogSlide";
import FeatureEventList from "@/app/components/pages/events/FeatureEventList";
import PhotoGallery from "@/app/components/pages/gallery/PhotoGallery";
import AutoSlideLogo from "@/app/components/pages/home/AutoSlide/AutoSlideLogo";
import Banner from "@/app/components/pages/home/banner/Banner";
import JourneySection from "@/app/components/pages/home/journey/JourneySection";
import Partners from "@/app/components/pages/home/partners/Partners";
import ServiceSlide from "@/app/components/pages/services/ServiceSlide";
import SuccessfulEvents from "../components/pages/events/SuccessfulEvents";
import { getBlogListApi } from "./api/blog-api";
import { getApi } from "./api/page-api";

export async function generateMetadata() {
  const homeData = await getApi("home");

  const pageData = homeData?.data?.page_data;
  const bannerData = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "banner"
  );

  const ogImage =
    bannerData?.images?.list?.[0]?.full_path ||
    "/static/opengraph-image.jpg";

  const title =
    pageData?.meta_title ||
    "";

  const description =
    pageData?.meta_description ||
    "";

  const ogTitle = pageData?.og_title || title;
  const ogDescription = pageData?.og_description || description;

  return {
    // Sets base URL so relative paths (e.g. '/opengraph-image.jpg') resolve automatically
    metadataBase: new URL("https://runrisenation.com"),
    title,
    description,

    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: "https://runrisenation.com",
      siteName: "RunRise Nation",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImage,
          alt: ogTitle,
        },
      ],
    },
  };
}

export default async function Home() {
  const apiValue = "home";
  const homeData = await getApi(apiValue);
  const blogs = await getBlogListApi();


  const bannerData = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "banner"
  );

  const announcementData = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "announcement-marquee"
  );

  const aboutUsData = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "about-us"
  );

  const successfulEventsData = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "our-successful-events"
  );

   const statsCounterData = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "stats-counter"
  );


  const featureService = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "feature-services"
  );

  const ourMarJour = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "our-marathon-journey"
  );

  const testimonial = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "testimonial"
  );

  const partners = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "our-trusted-partners"
  );

  const gallery = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "gallery"
  );

  const featureEvents = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "feature-events"
  );

  const featureBlogSubtitle = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "feature-blogs"
  );

  const featuredBlogs = blogs?.data?.filter(blog => blog?.data?.is_featured === 1);

  return (
    <>
      <Banner data={bannerData} />
      <AutoSlideLogo data={announcementData} />
      <OurMission hideTopImage data={aboutUsData} />
      <SuccessfulEvents data={successfulEventsData} />
      <Counter data={statsCounterData} />
      <ServiceSlide data={featureService} />
      <JourneySection data={ourMarJour} />
      <TestimonialSec data={testimonial} />
      <Partners data={partners} />
      <PhotoGallery data={gallery} />
      <FeatureEventList data={featureEvents} />
      <FeaturedBlogSlide data={featureBlogSubtitle} featuredBlogs={featuredBlogs}  />
    </>
  );
}