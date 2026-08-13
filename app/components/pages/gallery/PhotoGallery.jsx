"use client"
import clsx from "clsx";
import Link from "next/link";
import dynamic from "next/dynamic";
import PhotoGalleryList from "./PhotoGalleryList";
import FillButton from "@/app/components/common/FillButton";
const AnimatedShowSVG = dynamic(() => import('@/app/components/animated-svg/AnimatedShowSVG'), { ssr: false })

export default function PhotoGallery({ data }) {
  const overLine = data?.section_data?.overline_text;
  const subtitle = data?.section_data?.subtitle;
  const images = data?.images?.list;

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
        {
          overLine && <span className="text-brand uppercase font-bold tracking-wide text-sm">
            {overLine}
          </span>
        }

        {
          subtitle && <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-dark">
            {subtitle}
          </h2>
        }


      </div>

      {/* Masonry Grid */}
      <div className=" container m-auto">
        <PhotoGalleryList images={images} />
      </div>

      {/* See More Button */}
      <div className="text-center mt-12 relative z-10">
        <Link href="/gallery" className="inline-block">
          <FillButton>
            See More
          </FillButton>
        </Link>
      </div>
    </section>
  );
}
