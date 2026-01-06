import Link from "next/link";

export default function HeaderListItem({ icon: Icon, text, href }) {
  return (
    <li className="flex items-center gap-1.5 text-[15px] leading-[24px] font-medium text-[#FAFAFA]">
      <Icon size="16" color="var(--color-brand)" />
      <Link href={href}>{text}</Link>
    </li>
  );
}
