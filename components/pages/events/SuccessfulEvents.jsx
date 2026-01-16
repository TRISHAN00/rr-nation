"use client";
import SubtitleWithArrow from "@/components/common/SubtitleWithArrow";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import EventCard from "./EventCard";

export default function SuccessfulEvents() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="py-20 lg:py-35 bg-white">
      <div className="container m-auto px-7.5 overflow-hidden">
        <SubtitleWithArrow
          label="Our Successful Events"
          title="Featuring Our Successful Marathon Events"
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={() => swiperInstance?.slideNext()}
          isBeginning={isBeginning}
          isEnd={isEnd}
          className="mb-10"
        />

        <Swiper
          spaceBetween={30} // spacing between slides
          slidesPerView={3} // default for mobile
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
            150: { slidesPerView: 1 }, // small screens
            250: { slidesPerView: 1 }, // small screens
            320: { slidesPerView: 1 }, // small screens
            480: { slidesPerView: 1 }, // small screens
            640: { slidesPerView: 2 }, // small screens
            768: { slidesPerView: 2 }, // tablets
            1024: { slidesPerView: 3 }, // laptops/desktops
            1280: { slidesPerView: 3 }, // large screens
          }}
        >
          {[...Array(5)].map((_, i) => (
            <SwiperSlide key={i}>
              <EventCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
