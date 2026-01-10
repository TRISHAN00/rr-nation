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
        <FollowUs />

        {/* Banner Text */}
        <BannerCTA />

        {/* Slider Bullet Points */}
        <BannerPagination />
      </div>

      {/* Shapes */}
      <BannerShapes type="corner" />
      <BannerShapes type="wave" />
    </div>
  );
}
