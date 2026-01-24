"use client";
import SubtitleWithArrow from "@/components/common/SubtitleWithArrow";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "./BlogCard";

export default function FeaturedBlogSlide() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className=" py-20 lg:py-35">
      <div className="container m-auto px-7.5 ">
        <SubtitleWithArrow
          label="Blogs"
          title="Explore Latest Blogs"
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={() => swiperInstance?.slideNext()}
          isBeginning={isBeginning}
          isEnd={isEnd}
          className="mb-10"
          bgColor={"#E0F7F6"}
        />

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
    </section>
  );
}
