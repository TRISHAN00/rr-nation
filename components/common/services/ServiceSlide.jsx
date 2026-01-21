"use client";

import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import clsx from "clsx";
import SubtitleWithArrow from "../SubtitleWithArrow";
import ServiceCard from "./ServiceCard";

export default function ServiceSlide() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section
      className={clsx(
        `relative service-slide before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-27.5 lg:before:h-53 md:before:h-27.5  before:bg-white before:z-0`
      )}
    >
      <div className="pt-20 lg:pt-35 bg-[#E0F7F6] ">
        <div className="container m-auto px-7.5 overflow-hidden">
          <SubtitleWithArrow
            label="Our Services"
            title="Latest Training Tips & Community Stories"
            onPrev={() => swiperInstance?.slidePrev()}
            onNext={() => swiperInstance?.slideNext()}
            isBeginning={isBeginning}
            isEnd={isEnd}
            className="mb-10"
            bgColor={"#E0F7F6"}
          />
        </div>
      </div>
      <div className=" bg-[#E0F7F6]   lg:pb-25">
        <div className="container m-auto px-7.5 overflow-hidden ">
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
                <ServiceCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
