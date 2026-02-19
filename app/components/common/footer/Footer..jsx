"use client";

import BannerShapes from "@/app/components/common/ShapeIcon";
import { useEffect, useState } from "react";
import Logo from "../Logo";
import FooterCTA from "./FooterCTA";
import FooterInfo from "./FooterInfo";
import FooterList from "./FooterList";
import FooterSocial from "./FooterSocial";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // only render dynamic parts on client
  }, []);

  return (
    <footer
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/static/footer-bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative container mx-auto px-4">
        {/* Medal Icon */}
        {mounted && <BannerShapes type="medal" />}

        {/* Footer CTA */}
        <FooterCTA />

        {/* Indicator */}
        {mounted && (
          <div className="flex justify-end mt-2 animate-arrow-indicate">
            <BannerShapes type="indicator" />
          </div>
        )}

        {/* Logo */}
        <div className="mt-10">
          <Logo />
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-20 mt-10">
          <FooterInfo />
          <FooterList
            title="Quick Links"
            hoverColor="#00a19a"
            links={[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Our Services", href: "/services" },
              { label: "Blogs", href: "/blogs" },
            ]}
          />

          <FooterList
            title="Quick Links"
            hoverColor="#00a19a"
            links={[
              { label: "Gallery", href: "/gallery" },
              { label: "Team", href: "/team" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy Policy", href: "/privacy-policy" },
            ]}
          />

          <FooterSocial gap={5} />
        </div>
      </div>
    </footer>
  );
}
