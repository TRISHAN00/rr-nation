"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // for active link

export default function NavItems() {
  const pathname = usePathname(); 

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Event", href: "/event" },
    { label: "Blog", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav>
      <ul className="flex text-white gap-7">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`
                  relative
                  transition-colors duration-300
                  ${isActive ? "text-[var(--color-brand)] font-semibold" : "hover:text-[var(--color-brand)]"}
                `}
              >
                {link.label}
                {/* Optional underline effect */}
                <span
                  className={`
                    absolute left-0 -bottom-1 w-full h-[2px] bg-[var(--color-brand)] 
                    transition-all duration-300
                    ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                    origin-left
                  `}
                ></span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
