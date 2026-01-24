import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({
  image = "/dynamic/about/about-us-dd.jpg",
  title = "Championship Event",
  description = "RunRise Nation is a passionate running community built on fitness, endurance.",
}) {
  return (
    <Link href={"/services/abc"}>
      <div className="w-full cursor-pointer pb-28 group">
        <div className="relative z-10">
          {/* Image Wrapper */}
          <div className="relative rounded-3xl md:rounded-4xl overflow-hidden">
            <AspectRatio ratio={10 / 11}>
              <Image
                src={image}
                fill
                alt={title}
                className="h-full w-full object-cover"
              />
            </AspectRatio>

            {/* Corner Shape (Desktop Only) */}
            <div
              className={clsx(`hidden md:block absolute top-0 right-0 opacity-0 scale-90 translate-x-3 -translate-y-3
              transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:scale-100
              group-hover:translate-x-0
              group-hover:translate-y-0
              pointer-events-none`)}
            >
              <Image
                src="/static/service-corner.svg"
                width={100}
                height={100}
                alt="corner decoration"
              />
            </div>
          </div>

          {/* Floating Info Card */}
          <div
            className={clsx(`absolute left-0 bottom-0 translate-y-1/2
            w-[90%] sm:w-[80%] md:w-[75%]
            rounded-xl md:rounded-2xl
            bg-[#E0F7F6]
            border border-brand/40 border-l-4 border-l-brand
            px-5 md:px-6 py-4 md:py-5
            shadow-lg
            transition-all duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            md:group-hover:bg-brand`)}
          >
            {/* Title */}
            <h5
              className={clsx(`text-[18px] sm:text-[20px] md:text-[26px] leading-snug font-bold  text-dark
              transition-colors duration-500
              md:group-hover:text-light`)}
            >
              {title}
            </h5>

            {/* Description */}
            <p
              className={`mt-2 md:mt-3
              text-[13px] sm:text-[14px] leading-6
              text-dark md:text-light
              opacity-100 md:opacity-0
              max-h-full md:max-h-0
              translate-y-0 md:translate-y-2
              overflow-hidden
              transition-all duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              md:group-hover:opacity-100
              md:group-hover:max-h-40
              md:group-hover:translate-y-0`}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
