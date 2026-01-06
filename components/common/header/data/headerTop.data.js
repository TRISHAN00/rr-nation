import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

export const headerTopData = {
  left: [
    {
      icon: MapPin,
      text: "102/B New Market, Sandigo-USA",
      href: "#",
    },
    {
      icon: Mail,
      text: "info.runrisenation@gmail.com",
      href: "mailto:info.runrisenation@gmail.com",
    },
  ],

  right: [
    {
      icon: Phone,
      text: "09666 735 765",
      href: "tel:09666735765",
    },
  ],

  socials: [
    {
      icon: Facebook,
      href: "#",
      fill: true,
    },
    {
      icon: Instagram,
      href: "#",
    },
    {
      icon: Twitter,
      href: "#",
      fill: true,
    },
  ],
};
