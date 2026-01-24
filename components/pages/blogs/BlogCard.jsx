import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ name = "John D. Alexon" }) {
  return (
    <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-white transition ">
      {/* IMAGE */}
      <div className="relative w-full h-45 sm:h-55 md:h-65 lg:h-[280px] overflow-hidden">
        <Image
          src="/dynamic/event/event-01.jpg"
          fill
          alt="event"
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="pt-4 sm:pt-5 px-5 sm:px-7.5 pb-6 sm:pb-8">
        {/* DATE */}
        <div className="flex items-center gap-2">
          <span className="w-4 sm:w-5 h-0.5 bg-[#4DC9C1]" />
          <span className="text-gray text-sm sm:text-base font-medium">
            12 Oct, 2025
          </span>
        </div>

        {/* TITLE + DESC */}
        <div className="border-b border-[#4DC9C1] mt-4 sm:mt-5 pb-4 sm:pb-5 mb-4 sm:mb-5">
          <h5 className="text-lg sm:text-xl md:text-[22px] leading-snug font-bold mb-3 line-clamp-2">
            Lorem ipsum dolor sit amet consectetur.
          </h5>
          <p className="text-gray text-sm sm:text-base leading-relaxed line-clamp-2">
            Lorem ipsum dolor sit amet consectetur. Massa feugiat ac aliquam
            aenean
          </p>
        </div>

        {/* AUTHOR + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <h4 className="text-sm sm:text-base font-medium">
              {name}
            </h4>
          </div>

          <Link
            href="/"
            className="flex items-center  justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition hover:bg-[#4DC9C1] hover:text-white"
          >
            <div className=" -rotate-90" >
            <ArrowDownRight size={18} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
