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

export const metadata = {
  title: "RunRise Nation | Bangladesh's Leading Running Community",
  description:
    "Join RunRise Nation (RRN), a premier AIMS-associate running community in Bangladesh. Explore marathons, virtual runs, fitness training, and a supportive network of athletes. Run and Rise Together!",
  keywords: [
    "RunRise Nation",
    "RRN",
    "Running Bangladesh",
    "Dhaka Marathon",
    "Hatirjheel Run",
    "AIMS Associate Bangladesh",
    "Fitness Community Bangladesh",
  ],
  openGraph: {
    title: "RunRise Nation - Run and Rise Together",
    description:
      "Empowering runners of all levels through events, training, and community. Join the movement today!",
    url: "https://runrisenation.com", // Replace with actual URL
    siteName: "RunRise Nation",
    images: [
      {
        url: "/static/opengraph-image.jpg", // Ensure you have an OG image in your public folder
        width: 1200,
        height: 630,
        alt: "RunRise Nation Community Run",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RunRise Nation | Bangladesh's Premier Running Club",
    description:
      "The ultimate platform for runners in Bangladesh. Register for events, track your journey, and join our mission.",
    images: ["/static/opengraph-image.jpg"],
  },
};

export default function Home() {

  return (
    <>
      <Banner />
      <AutoSlideLogo />
      <OurMission hideTopImage />
      {/* <SuccessfulEvents /> */}
      <Counter />
      <ServiceSlide />
      <JourneySection />
      <TestimonialSec />
      <Partners />
      <PhotoGallery />
      <FeatureEventList />
      <FeaturedBlogSlide />
    </>
  );
}
