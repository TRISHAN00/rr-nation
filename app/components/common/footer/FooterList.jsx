import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function FooterList({
  title = "Quick Links",
  links = [],
  hoverColor = "#00a19a",
}) {
  return (
    <div>
      {/* Title */}
      <h6 className="text-[#FAFAFA] text-[24px] leading-7 font-bold mb-7.5">
        {title}
      </h6>

      {/* List */}
      <ul className="flex flex-col gap-5">
        {links.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="flex items-center gap-3 text-gray-300 text-[16px] leading-6 font-medium transition-colors duration-200 hover:font-bold"
              style={{
                // Apply hover color with inline CSS
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")} // gray-300 fallback
            >
              {/* Icon */}
              <ChevronRight className="w-4 h-4 shrink-0" />
              {/* Text */}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
