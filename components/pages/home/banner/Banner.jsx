import BannerShapes from "../../../common/ShapeIcon";
import BannerCTA from "./BannerCTA";
import Overlay from "./Overlay";

import BannerPagination from "./BannerPagination";
import BannerSlider from "./BannerSlider";
import FollowUs from "./FollowUs";

export default function Banner() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Swiper */}
      <BannerSlider />

      {/* Overlay */}
      <Overlay />

      {/* Banner Content */}
      <div className="absolute inset-0 z-10 flex items-center max-w-7xl mx-auto px-[30px] text-white">
        {/* Follow Us */}
        <div className=" hidden md:flex lg:flex xl:flex 2xl:flex" >
        <FollowUs />
        
        {/* Slider Bullet Points */}
        <BannerPagination />
        </div>

        {/* Banner Text */}
        <BannerCTA />

      </div>

      {/* Shapes */}
      <BannerShapes type="corner" />
      <BannerShapes type="wave" />
    </div>
  );
}
