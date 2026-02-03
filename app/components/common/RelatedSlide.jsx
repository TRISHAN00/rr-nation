"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import { useState } from "react";
import "swiper/css";
import ServiceCard from "../pages/services/ServiceCard";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

export default function RelatedSlide() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        <SwiperSlide>
          <ServiceCard />
        </SwiperSlide>
        <SwiperSlide>
          <ServiceCard />
        </SwiperSlide>
        <SwiperSlide>
          <ServiceCard />
        </SwiperSlide>
        <SwiperSlide>
          <ServiceCard />
        </SwiperSlide>
        <SwiperSlide>
          <ServiceCard />
        </SwiperSlide>
      </Swiper>

      {/* Prev Button */}
      <div className="prev-btn absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 hidden md:block">
        <PrevArrow onPrev={() => swiperInstance?.slidePrev()} />
      </div>

      {/* Next Button */}
      <div className="next-btn absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 hidden md:block">
        <NextArrow onNext={() => swiperInstance?.slideNext()} />
      </div>
    </div>
  );
}
