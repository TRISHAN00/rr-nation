import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function HeaderSocial({
  direction = "row",
  bgColor,
  iconColor = "#fff",
  size = 36,
  gap,
}) {
  return (
    <ul
      className={`flex ${
        direction === "column" ? "flex-col" : "flex-row"
      } items-center gap-${gap || ""}`}
    >
      {[
        { Icon: Facebook, fill: true },
        { Icon: Instagram },
        { Icon: Twitter, fill: true },
      ].map(({ Icon, fill }, index) => (
        <li key={index}>
          <Link
            href="#"
            className={`
              group relative flex items-center justify-center rounded-full
              transition-all duration-300 ease-out
              hover:-translate-y-1 hover:scale-110
              hover:shadow-lg
            `}
            style={{
              backgroundColor: bgColor,
              width: size,
              height: size,
            }}
          >
            {/* Glow */}
            <span
              className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60"
              style={{ backgroundColor: bgColor }}
            />

            {/* Icon */}
            <Icon
              size={18}
              color={iconColor}
              fill={fill ? iconColor : undefined}
              strokeWidth={fill ? 0 : 2}
              className="relative z-10 transition-transform duration-300 group-hover:rotate-6"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
