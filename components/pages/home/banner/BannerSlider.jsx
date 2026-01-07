"use client";

import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BannerSlider() {
  return (
    <>
      <Swiper
        className="w-full h-screen"
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={1500} // smooth transition
        pagination={{
          clickable: true,
        }}
        loop
      >
        <SwiperSlide className="relative w-full h-screen">
          <Image
            src="/dynamic/home/banner/banner.jpg"
            alt="Hero Image"
            fill
            priority
            className="object-cover"
          />
        </SwiperSlide>

        <SwiperSlide className="relative w-full h-screen">
          <Image
            src="/dynamic/home/banner/banner-01.jpg"
            alt="Hero Image"
            fill
            className="object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="relative w-full h-screen">
          <Image
            src="/dynamic/home/banner/banner.jpg"
            alt="Hero Image"
            fill
            priority
            className="object-cover"
          />
        </SwiperSlide>

        <SwiperSlide className="relative w-full h-screen">
          <Image
            src="/dynamic/home/banner/banner-01.jpg"
            alt="Hero Image"
            fill
            className="object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
