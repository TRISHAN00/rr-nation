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
      <h6 className="text-[#FAFAFA] text-[24px] leading-[28px] font-bold mb-[30px]">
        {title}
      </h6>

      {/* List */}
      <ul className="flex flex-col gap-5">
        {links.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              style={{ "--hover": hoverColor }}
              className="
                flex items-center gap-3
                text-[#868681]
                text-[16px] leading-[24px] font-medium
                transition-all duration-200
                hover:text-[var(--hover)]
                hover:font-bold
              "
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
