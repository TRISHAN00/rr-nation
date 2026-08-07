"use client";
import SubtitleWithArrow from "@/app/components/common/SubtitleWithArrow";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SuccessEventCard from "./SuccessEventCard";

export default function SuccessfulEvents({ data }) {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const subtitle = data?.section_data?.subtitle || "";
  const title = data?.section_data?.title || "";
  const succEvents = data?.posts?.list || [];

  return (
    <section className="py-16 lg:py-35 bg-white">
      <div className="container m-auto px-7.5 overflow-hidden">
        <SubtitleWithArrow
          label={title}
          title={subtitle}
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={() => swiperInstance?.slideNext()}
          isBeginning={isBeginning}
          isEnd={isEnd}
          className="mb-10"
        />

        <Swiper
          spaceBetween={30}
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
          {/* ✅ Map through your real data here */}
          {succEvents.map((event) => (
            <SwiperSlide key={event.id}>
              <SuccessEventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}