import { Quote } from "lucide-react";

export default function BlogQuote() {
  return (
    <div className="bg-[#E0F7F6] 
      flex flex-col sm:flex-row 
      gap-5 sm:gap-7.5
      p-6 sm:p-10 lg:px-17.5 lg:pt-10 lg:pb-17.5
      rounded-xl"
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <Quote
          className="w-12 h-12 sm:w-16 sm:h-16 lg:w-[100px] lg:h-[100px]"
          fill="#00A19A"
          stroke="#00A19A"
        />
      </div>

      {/* Content */}
      <div>
        <p className="text-[14px] sm:text-[15px] lg:text-[16px] 
          leading-6 text-dark font-medium mb-6 sm:mb-8 lg:mb-10"
        >
          Alternative innovation to ethical network environmental whiteboard
          pursue compelling results premier methods empowerment. Dramatically
          architect go forward opportunities before user-centric partner
          Credibly implement exceptional
        </p>

        <div className="flex items-center gap-2">
          <div className="w-6 sm:w-7.5 h-px bg-brand"></div>
          <span className="text-[16px] sm:text-[18px] lg:text-[20px] 
            leading-6 font-medium text-brand"
          >
            John D. Alexon
          </span>
        </div>
      </div>
    </div>
  );
}
