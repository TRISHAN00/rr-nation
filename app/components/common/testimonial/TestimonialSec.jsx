"use client";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    id: 1,
    name: "Sudipta Kumar Das",
    role: "Community Runner",
    image: "/dynamic/testimonial/1.jpg",
    message:
      "Runrise Nation isn’t just about running, it’s about rising together! A truly inspiring community where fitness meets friendship and every step feels like progress.",
  },
  {
    id: 2,
    name: "সানাম খান",
    role: "Community Runner",
    image: "/dynamic/testimonial/2.jpg",
    message: `I thank the RunRise Nation for decorating a marathon run event so excellently. Hopefully in the future they'll organize many more beautiful events for dedicational runners so that we can become energetic again and again.`,
  },
  {
    id: 2,
    name: "Mohammad Istiak Chowdhury",
    role: "Community Runner",
    image: "/dynamic/testimonial/3.jpg",
    message: `Run Rise Nation, Best Organizer. Such a Beautiful Management. We Love RRN ✅`,
  },
];

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
          Runners Best Feedback
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
          {testimonials?.map((testimonial) => (
            <SwiperSlide>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="testimonial-pagination flex justify-center items-center gap-4 mt-8"></div>
      </div>
    </section>
  );
}
