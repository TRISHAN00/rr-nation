"use client";

import { useCMSGlobal } from "@/app/(frontend)/context/CMSGlobalContext";
import { Mail, MapPin, Phone } from "lucide-react";
import HeaderListItem from "../header/HeaderListItem";

export default function FooterInfo() {
  const { cmsGlobal } = useCMSGlobal();

  const leftItems = [
    cmsGlobal?.office_location && {
      icon: MapPin,
      text: cmsGlobal.office_location,
      href: cmsGlobal.office_map_link || "#",
    },
    (cmsGlobal?.office_phone || cmsGlobal?.phone_list) && {
      icon: Phone,
      text: cmsGlobal.office_phone || cmsGlobal.phone_list,
      href: `tel:${cmsGlobal.office_phone || cmsGlobal.phone_list}`,
    },
    cmsGlobal?.contact_email && {
      icon: Mail,
      text: cmsGlobal.contact_email,
      href: `mailto:${cmsGlobal.contact_email}`,
    },
  ].filter(Boolean);

  return (
    <div>
      <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-8 text-[#fafafa]">
        {cmsGlobal?.footer_text ||
          "RunRise Nation is a global running community dedicated to promoting fitness, sustainability, and environmental responsibility through impactful running events."}
      </p>

      <ul className="flex flex-col gap-5">
        {leftItems.map((item, index) => (
          <HeaderListItem key={index} {...item} />
        ))}
      </ul>
    </div>
  );
}