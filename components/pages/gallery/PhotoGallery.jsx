"use client"
import clsx from "clsx";
import dynamic from "next/dynamic";
import PhotoGalleryList from "./PhotoGalleryList";
const AnimatedShowSVG = dynamic(() => import('@/components/animated-svg/AnimatedShowSVG'), { ssr: false })


const images = [
  "/dynamic/home/banner/banner-01.jpg",
  "/dynamic/event/event-01.jpg",
  "/dynamic/home/banner/banner-01.jpg",
  "/dynamic/home/banner/banner.jpg",
  "/dynamic/home/banner/banner-01.jpg",
  "/dynamic/home/banner/banner.jpg",
  "/dynamic/home/banner/banner-01.jpg",
  "/dynamic/home/banner/banner-01.jpg",
];

export default function PhotoGallery() {
  return (
    <section
      className="pt-36 pb-30 relative"
      style={{
        backgroundImage: "url('/static/photo-gallery-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className={clsx(`absolute lg:top-25 lg:right-50 top-10 right-10`)}
      >
        <AnimatedShowSVG />
      </div>

      {/* Heading */}
      <div className="text-center mb-16 relative z-10 px-4">
        <span className="text-brand uppercase font-bold tracking-wide text-sm">
          Gallery
        </span>
        <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-dark">
          Moments from Our Running Community
        </h2>
      </div>

      {/* Masonry Grid */}
      <div className=" container m-auto">
        <PhotoGalleryList images={images} />
      </div>
    </section>
  );
}
