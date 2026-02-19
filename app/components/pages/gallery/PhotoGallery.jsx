"use client"
import clsx from "clsx";
import dynamic from "next/dynamic";
import PhotoGalleryList from "./PhotoGalleryList";
const AnimatedShowSVG = dynamic(() => import('@/app/components/animated-svg/AnimatedShowSVG'), { ssr: false })


const images = [
  "/dynamic/gallery/1.jpg",
  "/dynamic/gallery/2.jpg",
  "/dynamic/gallery/3.jpg",
  "/dynamic/gallery/4.jpg",
  "/dynamic/gallery/5.jpg",
  "/dynamic/gallery/6.jpg",
  "/dynamic/gallery/7.jpg",
  "/dynamic/gallery/8.jpg",
  "/dynamic/gallery/9.jpg",
  "/dynamic/gallery/10.jpg",
  "/dynamic/gallery/11.jpg",
  "/dynamic/gallery/12.jpg",
  "/dynamic/gallery/13.jpg",
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
          Moments we Cherish
        </h2>
      </div>

      {/* Masonry Grid */}
      <div className=" container m-auto">
        <PhotoGalleryList images={images} />
      </div>
    </section>
  );
}
