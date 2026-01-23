 "use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import ServiceCard from "./services/ServiceCard";

export default function RelatedSlide() {
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide><ServiceCard/></SwiperSlide>
        <SwiperSlide><ServiceCard/></SwiperSlide>
        <SwiperSlide><ServiceCard/></SwiperSlide>
        <SwiperSlide><ServiceCard/></SwiperSlide>
        <SwiperSlide><ServiceCard/></SwiperSlide>
       
      </Swiper>
    </div>
  );
}
