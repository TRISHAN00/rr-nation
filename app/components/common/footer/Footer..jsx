"use client";

import BannerShapes from "@/app/components/common/ShapeIcon";
import { useAuthContext } from "@/context/AuthContext";
import { getGlobalData } from "@/services/global.service";
import { useEffect, useState } from "react";
import Logo from "../Logo";
import FooterCTA from "./FooterCTA";
import FooterInfo from "./FooterInfo";
import FooterList from "./FooterList";
import FooterSocial from "./FooterSocial";

export default function Footer() {
  const { isAuthenticated } = useAuthContext();
  const [mounted, setMounted] = useState(false);
  const [global, setGlobal] = useState({});

  const fetchGlobal = async () => {
    try {
      if (!isAuthenticated) return;
      const res = await getGlobalData();
      setGlobal(res?.data?.data || {});
    } catch (err) {
      console.error("Failed to load global data", err);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchGlobal();
  }, [isAuthenticated]);

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
              ...(!global?.isMember ? [{ label: "Become a Member", href: "/member-register" }] : []),
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
              { label: "Terms and Conditions", href: "/terms" },
              { label: "Return & Refund Policy", href: "/refund-policy" },
              { label: "FAQs", href: "/faqs" },
            ]}
          />

          <FooterSocial gap={5} />
        </div>

        {/* --- Copyright & Developer Section --- */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/70 text-sm">
            <p>
              © {new Date().getFullYear()} Run Rise Nation. All Rights Reserved.
            </p>

            <p>
              Designed and Developed By{" "}
              <a
                href="https://codemanbd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#00a19a] transition-colors duration-300 font-medium"
              >
                Codemanbd
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
