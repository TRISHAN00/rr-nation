import { Mail, MapPin, Phone } from "lucide-react";
import HeaderListItem from "../header/HeaderListItem";

const leftItems = [
  {
    icon: MapPin,
    text: "House 91/B, Fulkoli Mor, Section-12, Block B, Road 1, Kalshi Road, Pallabi, Dhaka-1216",
    href: "https://maps.app.goo.gl/gviJhSxTuiY7pthX9",
  },
  {
    icon: Phone,
    text: "+8801889996700",
    href: "tel:+8801889996700",
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
        RunRise Nation is a global running community dedicated to promoting
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
