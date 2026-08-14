"use client"
import Link from "next/link";

export default function HeaderListItem({ icon: Icon, text, href }) {
  console.log(text)

  return (
    <li className="flex items-center gap-1.5 text-[15px] leading-6 font-medium text-[#FAFAFA]">
      <span className="shrink-0">
        <Icon size="16" color="var(--color-brand)" />
      </span>
      <Link href={`${href}`}>{text}</Link>
    </li>
  );
}
