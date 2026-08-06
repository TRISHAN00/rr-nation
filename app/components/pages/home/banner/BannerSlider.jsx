"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BannerSlider({ sliderImages }) {
  return (
    <>
      <Swiper
        className="w-full h-screen"
        modules={[Autoplay, Pagination]}
        direction={"vertical"}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={1500}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        loop
      >
        {
          sliderImages?.map((image) => {
            return (
              <SwiperSlide key={image?.id} className="relative w-full h-screen">
                <Image
                  src={image?.full_path}
                  alt="Hero Image"
                  fill
                  priority
                  className="object-cover"
                />
              </SwiperSlide>)
          })
        }
      </Swiper>

    </>
  );
}
