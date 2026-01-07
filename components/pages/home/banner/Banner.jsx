
import HeaderSocial from "@/components/common/header/HeaderSocial";
import BannerCTA from "./BannerCTA";
import BannerShapes from "./BannerShapes";
import Overlay from "./Overlay";


import "swiper/css";
import "swiper/css/pagination";
import BannerSlider from "./BannerSlider";

export default function Banner() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Swiper */}
      <BannerSlider/>

      {/* Overlay */}
      <Overlay />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center max-w-7xl mx-auto px-[30px] text-white">
        <div className="w-11 h-80 mr-10 flex flex-col items-center justify-center">
          <HeaderSocial direction="column" />

          <div className="h-10 w-[1px] bg-white my-3.5" />

          <h5
            className="
              uppercase text-md font-semibold
              [writing-mode:vertical-rl]
              rotate-180
            "
          >
            Follow Us
          </h5>
        </div>

        <BannerCTA />
      </div>

      {/* Shapes */}
      <BannerShapes type="corner" />
      <BannerShapes type="wave" />
    </div>
  );
}
