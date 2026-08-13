import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ blog }) {
  const title = blog?.data?.title;
  const body = blog?.data?.body;
  const slug = blog?.data?.slug;
  const thumb = blog?.images?.list?.find(image => image?.full_path)?.full_path || null;
  const author = blog?.images?.list?.[0]?.short_title;
  const date = blog?.data?.date ? new Date(blog.data.date) : null;
  const formattedDate = date ? date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }) : "";

  return (
    <Link
      href={`/blogs/${encodeURIComponent(slug)}`}
      className="rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-white transition hover:shadow-lg group block"
    >
      {/* IMAGE */}
      <div className="relative w-full h-45 sm:h-55 md:h-65 lg:h-70 overflow-hidden bg-gray-100">
        {thumb && (
          <Image
            src={thumb}
            fill
            alt={title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {/* Category Tag (Optional addition) */}
        <span className="absolute top-4 left-4 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full">
          {author || "Blog"}
        </span>
      </div>

      {/* CONTENT */}
      <div className="pt-4 sm:pt-5 px-5 sm:px-7.5 pb-6 sm:pb-8">
        {/* DATE (Using a placeholder for now) */}
        <div className="flex items-center gap-2">
          <span className="w-4 sm:w-5 h-0.5 bg-[#4DC9C1]" />
          <span className="text-gray-500 text-sm sm:text-base font-medium">
            {formattedDate || "12 Oct, 2025"}
          </span>
        </div>

        {/* TITLE + DESC */}
        <div className="border-b border-[#4DC9C1]/30 mt-4 sm:mt-5 pb-4 sm:pb-5 mb-4 sm:mb-5">
          <h5 className="text-lg sm:text-xl md:text-[22px] leading-snug font-bold mb-3 line-clamp-2">
            {title}
          </h5>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-2">
            {body}
          </p>
        </div>
      </div>
    </Link>
  );
}