"use client";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Partner from "./Partner";

const partners = [
  "/dynamic/partners/1.PNG",
  "/dynamic/partners/2.PNG",
  "/dynamic/partners/3.jpg",
  "/dynamic/partners/4.png",
  "/dynamic/partners/5.jpg",
  "/dynamic/partners/6.jpg",
  "/dynamic/partners/7.jpg",
  "/dynamic/partners/8.png",

];

export default function Partners() {
  return (
    <section className="partners-area relative bg-[#FAFAFA]">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#E0F7F6]  z-0"></div>

      <div className="  mx-10">
        {/* Half background */}

        <div className="relative bg-brand py-3 px-4 lg:py-14 lg:px-8 md:px-16 container mx-auto rounded-4xl overflow-hidden z-10">
          <h6 className="text-[24px] text-white leading-7 font-bold text-center mb-10">
            Our Trusted Partners
          </h6>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
          >
            {partners.map((logo, index) => (
              <SwiperSlide key={index}>
                <Partner src={logo} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
