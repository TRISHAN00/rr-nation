import Counter from "@/components/common/counter/Counter";
import TestimonialSec from "@/components/common/testimonial/TestimonialSec";
import OurMission from "@/components/pages/about/OurMission";
import SuccessfulEvents from "@/components/pages/events/SuccessfulEvents";
import AutoSlideLogo from "@/components/pages/home/AutoSlide/AutoSlideLogo";
import Banner from "@/components/pages/home/banner/Banner";
import JourneySection from "@/components/pages/home/journey/JourneySection";
import ServiceSlide from "../components/common/services/ServiceSlide";

export default function Home() {
  return (
    <>
      <Banner />
      <AutoSlideLogo />
      <OurMission />
      <SuccessfulEvents/>
      <Counter/>
      <ServiceSlide/>
      <JourneySection/>
      <TestimonialSec/>
    </>
  );
}
