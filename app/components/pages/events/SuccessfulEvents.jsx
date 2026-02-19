"use client";
import SubtitleWithArrow from "@/app/components/common/SubtitleWithArrow";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import EventCard from "./EventCard";

const succEvents = [
  {
    id: 1,
    name: 'Accounting Day Run 2025',
    date: 'November 07, 2025 ',
    Organizer: 'ICAB',
    partner: 'RunRise Nation',
    thumb: '/dynamic/successful-ev/1.jpeg'
  },
  {
    id: 2,
    name: 'Community Fun Run 2025 ',
    date: 'January 25, 2025  ',
    vanue: 'Chandrima Udyan',
    Organizer: 'ICAB',
    partner: 'RunRise Nation',
    thumb: '/dynamic/successful-ev/4.jpeg'
  },
  {
    id: 3,
    name: 'Noboborsho Run 1432 ',
    date: 'April 12, 2025 ',
    vanue: 'Chandrima Udyan',
    Organizer: 'ICAB',
    partner: 'RunRise Nation',
    thumb: '/dynamic/successful-ev/2.jpeg'
  },
  {
    id: 4,
    name: 'RunRise Nation 15K 2025',
    date: 'August 29, 2025 ',
    vanue: 'Hatirjheel, Dhaka ',
    Organizer: '(AIMS Certified)',
    thumb: '/dynamic/successful-ev/3.jpg'
  },
  {
    id: 5,
    name: 'RunRise Nation Badminton Tournament & BBQ Night 2026',
    date: 'JAN 10 2026',
    vanue: 'Mirpur, Dhaka ',
    Organizer: '(AIMS Certified)',
    thumb: '/dynamic/successful-ev/5.jpeg'
  },
]

export default function SuccessfulEvents() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="py-16 lg:py-35 bg-white">
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
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}