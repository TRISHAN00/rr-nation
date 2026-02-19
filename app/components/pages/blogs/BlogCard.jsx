import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import Image from "next/image";

export default function BlogCard({ blog }) {
  // Destructure for cleaner code
  const { title, author, description, image, category } = blog;

  return (
    <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-white transition hover:shadow-lg group">
      {/* IMAGE */}
      <div className="relative w-full h-45 sm:h-55 md:h-65 lg:h-70 overflow-hidden">
        <Image
          src={image}
          fill
          alt={title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category Tag (Optional addition) */}
        <span className="absolute top-4 left-4 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="pt-4 sm:pt-5 px-5 sm:px-7.5 pb-6 sm:pb-8">
        {/* DATE (Using a placeholder for now) */}
        <div className="flex items-center gap-2">
          <span className="w-4 sm:w-5 h-0.5 bg-[#4DC9C1]" />
          <span className="text-gray-500 text-sm sm:text-base font-medium">
            12 Oct, 2025
          </span>
        </div>

        {/* TITLE + DESC */}
        <div className="border-b border-[#4DC9C1]/30 mt-4 sm:mt-5 pb-4 sm:pb-5 mb-4 sm:mb-5">
          <h5 className="text-lg sm:text-xl md:text-[22px] leading-snug font-bold mb-3 line-clamp-2">
            {title}
          </h5>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* AUTHOR + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border border-[#4DC9C1]">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${author}`} />
              <AvatarFallback>
                {author
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <h4 className="text-sm sm:text-base font-semibold text-gray-800">
              {author}
            </h4>
          </div>

          {/* <Link
            href={`/blogs/${blog.id}`}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-brand text-brand transition hover:bg-brand hover:text-white"
          >
            <div className="-rotate-45 group-hover:rotate-0 transition-transform duration-300">
              <ArrowDownRight size={18} />
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
}