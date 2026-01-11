import { Mail, MapPin, Phone } from "lucide-react";
import HeaderListItem from "../header/HeaderListItem";

const leftItems = [
  {
    icon: MapPin,
    text: "House No. 1, Road No. 6, Section - 12, Block E, Extended Rupnagar R/A, Pallabi, Mirpur, Dhaka-1216.",
    href: "#",
  },
  {
    icon: Phone,
    text: "09666 735 765",
    href: "tel:09666735765",
  },
  {
    icon: Mail,
    text: "info.runrisenation@gmail.com",
    href: "mailto:info.runrisenation@gmail.com",
  },
];

export default function FooterInfo() {
  return (
    <div>
      <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-8 text-[#fafafa]">
        Run Rise Nation is a global running community dedicated to promoting
        fitness, sustainability, and environmental responsibility through
        impactful running events.
      </p>

      <ul className="flex flex-col gap-5">
        {leftItems.map((item, index) => (
          <HeaderListItem key={index} {...item} />
        ))}
      </ul>
    </div>
  );
}
