import { Mail, MapPin, Phone } from "lucide-react";
import HeaderTopListItem from "./HeaderListItem";
import HeaderSocial from "./HeaderSocial";

const leftItems = [
  {
    icon: MapPin,
    text: "Pallabi, Mirpur, Dhaka-1216.",
    href: "#",
  },
  {
    icon: Mail,
    text: "info.runrisenation@gmail.com",
    href: "mailto:info.runrisenation@gmail.com",
  },
];

const rightItems = [
  {
    icon: Phone,
    text: "+8801889996700",
    href: "tel:+8801889996700",
  },
];

export default function HeaderTop() {
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
        <HeaderSocial />
      </div>
    </div>
  );
}
