"use client";

import { useCMSGlobal } from "@/app/(frontend)/context/CMSGlobalContext";
import { Facebook, Instagram, Twitter, Users, Youtube } from "lucide-react";
import Link from "next/link";

export default function HeaderSocial({
  direction = "row",
  bgColor,
  iconColor = "#fff",
  strokeColor = "#fff",
  size = 36,
  gap = 12,
}) {
  const { cmsGlobal } = useCMSGlobal();

  const socialData = [
    cmsGlobal?.facebook && {
      name: "Facebook",
      Icon: Facebook,
      fill: true,
      url: cmsGlobal.facebook,
    },
    cmsGlobal?.linkedin && {
      name: "Facebook Group",
      Icon: Users,
      fill: true,
      url: cmsGlobal.linkedin,
    },
    cmsGlobal?.instagram && {
      name: "Instagram",
      Icon: Instagram,
      fill: false,
      url: cmsGlobal.instagram,
    },
    cmsGlobal?.youtube && {
      name: "YouTube",
      Icon: Youtube,
      fill: false,
      url: cmsGlobal.youtube,
    },
    cmsGlobal?.twitter && {
      name: "Twitter",
      Icon: Twitter,
      fill: true,
      url: cmsGlobal.twitter,
    },
    {
      name: "Strava",
      Icon: "/static/social/strava.svg",
      fill: false,
      url: "https://www.strava.com/clubs/RunRiseNation",
      isOriginalColor: true,
    },
  ].filter(Boolean);

  return (
    <ul
      className={`flex ${direction === "column" ? "flex-col" : "flex-row"} items-center`}
      style={{ gap }}
    >
      {socialData.map(({ Icon, fill, url, isOriginalColor, name }, index) => {
        const isImage = typeof Icon === "string";
        const fillColor = fill === true ? iconColor : typeof fill === "string" ? fill : "none";

        return (
          <li key={index}>
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="group relative flex items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-lg will-change-transform transform-gpu"
              style={{
                backgroundColor: bgColor,
                width: size,
                height: size,
              }}
            >
              {/* Glow Effect - Uses brand orange for Strava, otherwise uses iconColor */}
              <span
                className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40"
                style={{
                  backgroundColor: isOriginalColor ? "#fc4c02" : (bgColor || iconColor),
                }}
              />

              {/* Icon Rendering */}
              {isImage ? (
                <img
                  src={Icon}
                  alt={`${name} icon`}
                  style={{
                    width: size * 0.65, // Slightly larger for better visibility
                    height: size * 0.65,
                    objectFit: "contain",
                  }}
                  // No 'invert' or 'brightness' filters here so it stays default
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