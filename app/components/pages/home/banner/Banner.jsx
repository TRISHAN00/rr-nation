import BannerShapes from "../../../common/ShapeIcon";
import BannerCTA from "./BannerCTA";
import Overlay from "./Overlay";

import BannerPagination from "./BannerPagination";
import BannerSlider from "./BannerSlider";
import FollowUs from "./FollowUs";

export default function Banner({ data }) {
  const sliderImages = data?.images?.list;

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Swiper */}
      {
        sliderImages?.length > 0 && (
          <BannerSlider sliderImages={sliderImages} />
        )
      }

      {/* Overlay */}
      <Overlay />

      {/* Banner Content */}
      <div className="container absolute inset-0 z-10 flex items-center  mx-auto px-7.5 text-white">
        {/* Follow Us */}
        <div className=" hidden md:flex lg:flex xl:flex 2xl:flex">
          <FollowUs />

          {/* Slider Bullet Points */}
          <BannerPagination />
        </div>

        {/* Banner Text */}
        <BannerCTA data={data} />
      </div>

      {/* Shapes */}
      <BannerShapes type="corner" />
      <BannerShapes type="wave" />
    </section>
  );
}
