import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function HeaderSocial({
  direction = "row",
  bgColor,
  iconColor = "#fff",
  size,
}) {
  return (
    <ul
      className={`flex ${
        direction === "column" ? "flex-col" : "flex"
      } items-center gap-3`}
    >
      {[
        { Icon: Facebook, fill: true },
        { Icon: Instagram },
        { Icon: Twitter, fill: true },
      ].map(({ Icon, fill }, index) => (
        <li key={index}>
          <Link
            href="#"
            className={`flex items-center justify-center ${
              bgColor ? "rounded-full" : ""
            }`}
            style={
              bgColor || size
                ? {
                    backgroundColor: bgColor,
                    width: size,
                    height: size,
                  }
                : undefined
            }
          >
            <Icon
              size={18}
              color={iconColor}
              fill={fill ? iconColor : undefined}
              strokeWidth={fill ? 0 : 2}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
