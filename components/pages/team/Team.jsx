"use client";
import Title from "@/components/common/Title";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import TeamCard from "./TeamCard";

export default function Team() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <section className=" py-20 lg:py-30 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5">
        <Title
          label="Our Services"
          title="Latest Training Tips & Community Stories"
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={() => swiperInstance?.slideNext()}
          isBeginning={isBeginning}
          isEnd={isEnd}
          className="mb-10"
          bgColor={"#E0F7F6"}
        />
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
              1024: { slidesPerView: 4 },
            }}
          >
            {[...Array(5)].map((_, i) => (
              <SwiperSlide key={i}>
                <TeamCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
