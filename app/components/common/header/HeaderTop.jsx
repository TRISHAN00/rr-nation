"use client";
import { useCMSGlobal } from "@/app/(frontend)/context/CMSGlobalContext";
import { Mail, Phone } from "lucide-react";
import HeaderTopListItem from "./HeaderListItem";
import HeaderSocial from "./HeaderSocial";

export default function HeaderTop() {
  const { cmsGlobal } = useCMSGlobal();

  const leftItems = [
    cmsGlobal?.contact_email && {
      icon: Mail,
      text: cmsGlobal.contact_email,
      href: `mailto:${cmsGlobal.contact_email}`,
    },
  ].filter(Boolean);

  const rightItems = [
    cmsGlobal?.office_phone && {
      icon: Phone,
      text: cmsGlobal.office_phone,
      href: `tel:${cmsGlobal.office_phone}`,
    },
  ].filter(Boolean);

  return (
    <div className="flex justify-between border-b border-white/20 pb-2.5 mb-2.5">
      <ul className="flex gap-10">
        {leftItems.map((item, index) => (
          <HeaderTopListItem key={index} {...item} />
        ))}
      </ul>

      <div className=" flex gap-10">
        <ul className="flex gap-10">
          {rightItems.map((item, index) => (
            <HeaderTopListItem key={index} {...item} />
          ))}
        </ul>
        <HeaderSocial cmsGlobal={cmsGlobal} />
      </div>
    </div>
  );
}