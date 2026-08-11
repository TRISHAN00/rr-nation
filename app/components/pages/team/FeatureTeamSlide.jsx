"use client";
import Title from "@/app/components/common/Title";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import TeamCard from "./TeamCard";

export default function FeatureTeamSlide({ hideSearch, data }) {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const members = data?.posts?.list || [];
  const normalizedMembers = members?.map((member, index) => {
    if (member?.data) {
      return {
        id: member.data?.id || index + 1,
        name: member.data?.title || "",
        role: member.data?.role || "",
        image: member.images?.[0]?.full_path || "",
      };
    }

    return member;
  }) || [];

  return (
    <section className=" py-20 lg:py-30 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5">
        <div className=" mb-20">
          <Title
            label={data?.section_data?.overline_text || "TEAM"}
            title={data?.section_data?.subtitle || "Latest Training Tips & Community Stories"}
            onPrev={() => swiperInstance?.slidePrev()}
            onNext={() => swiperInstance?.slideNext()}
            isBeginning={isBeginning}
            isEnd={isEnd}
            className="mb-10"
            bgColor={"#E0F7F6"}
            hideSearch
          />
        </div>
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
            {normalizedMembers?.map((member) => (
              <SwiperSlide key={member.id}>
                <TeamCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
