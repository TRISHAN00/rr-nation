"use client";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialSec() {
  return (
    <section
      className="relative pt-20 md:pt-35 pb-20 md:pb-55"
      style={{
        backgroundImage: "url('/static/testimonial-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Heading */}
      <div className="text-center mb-10 md:mb-20 relative z-10 px-4">
        <span className="text-brand uppercase font-bold tracking-wide text-sm">
          Testimonial
        </span>
        <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-dark">
          Clients best feedback about Run Rise Nation
        </h2>
      </div>

      {/* Swiper Slider */}
      <div className="container mx-auto relative z-10 px-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          loop
          speed={1500}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: ".testimonial-pagination",
          }}
          slidesPerView={2}
          breakpoints={{
            150: { slidesPerView: 1 },
            250: { slidesPerView: 1 },
            320: { slidesPerView: 1 },
            525: { slidesPerView: 1 },
            639: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
        >
          {/* Swiper Slides */}
          <SwiperSlide>
            <TestimonialCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestimonialCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestimonialCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestimonialCard />
          </SwiperSlide>
          {/* Add more <SwiperSlide> dynamically if needed */}
        </Swiper>

        {/* Custom Pagination */}
        <div className="testimonial-pagination flex justify-center items-center gap-4 mt-8"></div>
      </div>
    </section>
  );
}
