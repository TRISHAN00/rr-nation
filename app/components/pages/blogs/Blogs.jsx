"use client";
import Title from "@/app/components/common/Title";
import { useState } from "react";
import "swiper/css";
import BlogCard from "./BlogCard";

export default function Blogs({hideBtnArrow}) {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <section className=" py-20 lg:py-30 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5">
        <div className=" mb-10">
          <Title
            label="Our Services"
            title="Latest Training Tips & Community Stories"
            onPrev={() => swiperInstance?.slidePrev()}
            onNext={() => swiperInstance?.slideNext()}
            isBeginning={isBeginning}
            isEnd={isEnd}
            className="mb-10"
            bgColor={"#E0F7F6"}
            hideBtnArrow
          />
        </div>
        <div className=" grid gap-5 sm:gap-6 lg:gap-7.5 mt-8 sm:mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </section>
  );
}
