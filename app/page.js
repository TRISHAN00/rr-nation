import Counter from "@/components/common/counter/Counter";
import PhotoGallery from "@/components/common/gallery/PhotoGallery";
import TestimonialSec from "@/components/common/testimonial/TestimonialSec";
import OurMission from "@/components/pages/about/OurMission";
import Blogs from "@/components/pages/blogs/Blogs";
import FeatureEventList from "@/components/pages/events/FeatureEventList";
import SuccessfulEvents from "@/components/pages/events/SuccessfulEvents";
import AutoSlideLogo from "@/components/pages/home/AutoSlide/AutoSlideLogo";
import Banner from "@/components/pages/home/banner/Banner";
import JourneySection from "@/components/pages/home/journey/JourneySection";
import Partners from "@/components/pages/home/partners/Partners";
import ServiceSlide from "@/components/pages/services/ServiceSlide";

export default function Home() {
  return (
    <>
      <Banner />
      <AutoSlideLogo />
      <OurMission hideTopImage />
      <SuccessfulEvents />
      <Counter />
      <ServiceSlide/>
      <JourneySection />
      <TestimonialSec />
      <Partners />
      <PhotoGallery />
      <FeatureEventList />
      <Blogs/>
    </>
  );
}
