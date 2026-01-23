import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "./BlogCard";

export default function BlogFeaturedSlide() {
  return (
    <div className=" relative">
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {[...Array(5)].map((_, i) => (
          <SwiperSlide key={i}>
            <BlogCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
