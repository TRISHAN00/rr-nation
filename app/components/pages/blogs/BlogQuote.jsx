import { Quote } from "lucide-react";

export default function BlogQuote({ blog }) {
  const data = blog?.data;
  const author = blog?.images?.list?.[0]?.short_title || "RunRise Nation";
  const excerpt =
    data?.meta_description ||
    (data?.body?.length > 200 ? `${data.body.slice(0, 200)}...` : data?.body);

  return (
    <div className="bg-[#E0F7F6]
      flex flex-col sm:flex-row
      gap-5 sm:gap-7.5
      p-6 sm:p-10 lg:px-17.5 lg:pt-10 lg:pb-17.5
      rounded-xl"
    >
      {/* Icon */}
      <div className="shrink-0">
        <Quote
          className="w-12 h-12 sm:w-16 sm:h-16 lg:w-25 lg:h-25"
          fill="#00A19A"
          stroke="#00A19A"
        />
      </div>

      {/* Content */}
      <div>
        <p className="text-[14px] sm:text-[15px] lg:text-[16px]
          leading-6 text-dark font-medium mb-6 sm:mb-8 lg:mb-10"
        >
          {excerpt}
        </p>

        <div className="flex items-center gap-2">
          <div className="w-6 sm:w-7.5 h-px bg-brand"></div>
          <span className="text-[16px] sm:text-[18px] lg:text-[20px]
            leading-6 font-medium text-brand"
          >
            {author}
          </span>
        </div>
      </div>
    </div>
  );
}