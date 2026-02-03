import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Calendar } from "lucide-react";

export default function BlogInfo({ name = "Trishan" }) {
  return (
    <div className="py-8 sm:py-12 lg:py-15 px-4 sm:px-6 lg:px-10">
      {/* Title */}
      <h3 className="text-[#0E0E0E] 
        text-[26px] sm:text-[32px] lg:text-[40px] 
        leading-tight lg:leading-12 
        mb-4 sm:mb-5 
        font-bold"
      >
        Ocean Cleaning Services
      </h3>

      {/* Meta Info */}
      <ul className="flex flex-wrap items-center gap-4 sm:gap-6 
        pb-4 mb-6 sm:mb-10 border-b"
      >
        {/* Author */}
        <li className="flex items-center gap-2.5">
          <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <p className="text-[14px] sm:text-[16px] font-medium leading-6">
            John D. Alexon
          </p>
        </li>

        {/* Date */}
        <li className="flex gap-2 items-center">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
          <span className="text-[14px] sm:text-[16px] font-medium leading-6 text-gray">
            31 December
          </span>
        </li>
      </ul>

      {/* Content */}
      <p className="text-[14px] sm:text-[15px] lg:text-[16px] 
        leading-6 sm:leading-7 text-dark"
      >
        Alternative innovation to ethical network environmental whiteboard
        pursue compelling results premier methods empowerment. Dramatically
        architect go forward opportunities before user-centric partner Credibly
        implement exceptional Continually fashion orthogonal leadership skills
        whereas wireless metrics. Uniquely syndicate exceptio opportunities with
        interdependent users. Globally enhance fully tested meta-services rather
        than pan solutions. Proactively integrate client-integrate go forward
        architectures and turnkey meta-services. Interactively harness
        integrated ROI whereas frictionless products.
      </p>
    </div>
  );
}
