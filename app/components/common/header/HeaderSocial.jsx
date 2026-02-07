import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function HeaderSocial({
  direction = "row",
  bgColor,
  iconColor = "#fff",
  strokeColor = "#fff",
  size = 36,
  gap = 12,
}) {
  return (
    <ul
      className={`flex ${
        direction === "column" ? "flex-col" : "flex-row"
      } items-center`}
      style={{ gap }}
    >
      {[
        { Icon: Facebook, fill: true },
        { Icon: Instagram, fill: "#00a19a" },
        { Icon: Twitter, fill: true },
      ].map(({ Icon, fill }, index) => {
        const fillColor =
          fill === true ? iconColor : typeof fill === "string" ? fill : "none";

        return (
          <li key={index}>
            <Link
              href="#"
              className={`  group relative flex items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-lg will-change-transform transform-gpu`}
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
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={2}
                className="relative z-10"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
