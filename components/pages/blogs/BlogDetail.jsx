import Image from "next/image";
import BlogInfo from "./BlogInfo";
import BlogQuote from "./BlogQuote";

export default function BlogDetail() {
  return (
    <article className="border border-gray/20 rounded-3xl sm:rounded-4xl overflow-hidden bg-white">
      {/* Thumbnail */}
      <div className="overflow-hidden">
        <Image
          src="/dynamic/event/event-banner.jpg"
          alt="Blog cover"
          width={870}
          height={480}
          className="w-full h-[220px] sm:h-[320px] lg:h-[480px] object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8 sm:gap-10">
        <BlogInfo />
        <div className="px-4 sm:px-6 lg:px-10 pb-8 sm:pb-12">
          <BlogQuote />
        </div>
      </div>
    </article>
  );
}
