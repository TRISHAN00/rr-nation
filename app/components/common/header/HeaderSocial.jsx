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
  const socialData = [
    {
      Icon: Facebook,
      fill: true,
      url: "https://www.facebook.com/runrise.nation",
    },
    { 
      Icon: Instagram, 
      fill: "#00a19a", 
      url: "https://instagram.com/runrise.nation" 
    },
    { 
      Icon: Twitter, 
      fill: true, 
      url: "https://twitter.com/runrise" 
    },
    { 
      // This is now a string path
      Icon: '/static/social/strava.svg', 
      fill: false, 
      url: "https://www.strava.com/clubs/runrise" 
    },
  ];

  return (
    <ul
      className={`flex ${direction === "column" ? "flex-col" : "flex-row"} items-center`}
      style={{ gap }}
    >
      {socialData.map(({ Icon, fill, url }, index) => {
        const fillColor = fill === true ? iconColor : typeof fill === "string" ? fill : "none";
        const isImage = typeof Icon === "string";

        return (
          <li key={index}>
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-lg will-change-transform transform-gpu"
              style={{
                backgroundColor: bgColor,
                width: size,
                height: size,
              }}
            >
              {/* Glow */}
              <span
                className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60"
                style={{ backgroundColor: bgColor || (isImage ? iconColor : fillColor) }}
              />

              {/* Conditional Rendering: Image vs Lucide Component */}
              {isImage ? (
                <img
                  src={Icon}
                  alt="Social Icon"
                  style={{ 
                    width: size * 1, 
                    height: size * 1,
                    objectFit: 'contain' 
                  }}
                  className="relative z-10"
                />
              ) : (
                <Icon
                  size={size * 0.5}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={2}
                  className="relative z-10"
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}