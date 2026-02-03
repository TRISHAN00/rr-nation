import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import Rating from "../Rating";

export default function TestimonialCard({ name = "Chris Diaz", role = "Community Runner", message }) {
  return (
    <div className="bg-white flex flex-col sm:flex-row gap-5 sm:gap-7.5 pt-6 sm:pt-10 pb-6 sm:pb-25 px-5 sm:px-7.5 rounded-4xl overflow-hidden  duration-300">
      
      {/* Avatar */}
      <div className="shrink-0">
        <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
      </div>

      {/* Content */}
      <div className="flex-1">
        <Rating number={5} />

        <p className="text-gray text-[16px] sm:text-[18px] leading-6 sm:leading-7 font-semibold mt-4 sm:mt-7.5 mb-3 sm:mb-5">
          {message || "Running with Run Rise Nation gave my workouts real meaning. It feels great to run for a cause."}
        </p>

        <div>
          <h6 className="text-dark text-[20px] sm:text-[24px] leading-6 sm:leading-7 font-bold mb-1">
            {name}
          </h6>
          <p className="text-gray text-[14px] sm:text-[16px] leading-5 sm:leading-6 font-medium">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}
