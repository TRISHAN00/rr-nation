import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Calendar } from "lucide-react";

export default function BlogInfo({ blog }) {
  const data = blog?.data;
  const images = Array.isArray(blog?.images?.list) ? blog.images.list : [];
  const authorInfo = images.find(image => image?.isAuthor === "on") || {};

  const date = data?.date ? new Date(data.date) : null;
  const formattedDate = date ? date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }) : "";

  return (
    <div className="py-8 sm:py-12 lg:py-15 px-4 sm:px-6 lg:px-10">
      {/* Title */}
      <h3 className="text-[#0E0E0E]
        text-[26px] sm:text-[32px] lg:text-[40px]
        leading-tight lg:leading-12
        mb-4 sm:mb-5
        font-bold"
      >
        {data?.title}
      </h3>

      {/* Meta Info */}
      <ul className="flex flex-wrap items-center gap-4 sm:gap-6
        pb-4 mb-6 sm:mb-10 border-b"
      >
        {/* Author */}
        <li className="flex items-center gap-2.5">
          <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
            
            <AvatarImage
              src={authorInfo?.full_path ? authorInfo?.full_path : "https://github.com/shadcn.png"}
            />
            <AvatarFallback>
              {authorInfo.short_title
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>+
          </Avatar>

          <p className="text-[14px] sm:text-[16px] font-medium leading-6">
            {authorInfo?.short_title}
          </p>
        </li>

        {/* Date */}
        <li className="flex gap-2 items-center">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
          <span className="text-[14px] sm:text-[16px] font-medium leading-6 text-gray">
            {formattedDate}
          </span>
        </li>
      </ul>

      {/* Content */}
      <div className="text-[14px] sm:text-[15px] lg:text-[16px]
        leading-6 sm:leading-7 text-dark whitespace-pre-line"
      >
        {data?.body}
      </div>
    </div>
  );
}