import { Avatar, AvatarImage } from "@/app/components/ui/avatar";
import Link from "next/link";

export default function RelatedBlogCard() {
  return (
    <div className="bg-[#E0F7F6] p-5 sm:p-7.5 lg:p-10 rounded-2xl">
      <h2 className="text-gray text-sm font-medium mb-5">
        Related Blogs
      </h2>

      <ul className="flex flex-col gap-4">
        {[1, 2, 3, 4].map((item) => (
          <li key={item}>
            <Link
              href="/blogs/abc"
              className="flex items-center gap-3 sm:gap-4 group"
            >
              {/* Thumbnail */}
              <div className="shrink-0">
                <Avatar className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </div>

              {/* Title */}
              <h4 className="text-base sm:text-lg font-medium text-dark group-hover:text-brand transition-colors line-clamp-2">
                Lorem ipsum dolor sit amet consectetur.
              </h4>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
