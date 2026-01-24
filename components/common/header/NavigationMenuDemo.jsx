"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainMenu() {
  const pathname = usePathname();
  const activeClass = "text-teal-400 border-b-2 border-teal-400";
  const defaultClass = "text-gray-200 hover:text-teal-400";

  return (
    <NavigationMenu className=" py-3 rounded-md ">
      <NavigationMenuList className="gap-4">
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle({
              className: pathname === "/" ? activeClass : defaultClass,
            })}
          >
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* About */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle({
              className: pathname === "/about" ? activeClass : defaultClass,
            })}
          >
            <Link href="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Events */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle({
              className: pathname === "/events" ? activeClass : defaultClass,
            })}
          >
            <Link href="/events">Events</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Services */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle({
              className: pathname === "/services" ? activeClass : defaultClass,
            })}
          >
            <Link href="/services">Services</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Blog */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle({
              className: pathname === "/blog" ? activeClass : defaultClass,
            })}
          >
            <Link href="/blog">Blog</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Gallery */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle({
              className: pathname === "/gallery" ? activeClass : defaultClass,
            })}
          >
            <Link href="/gallery">Gallery</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Team */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle({
              className: pathname === "/team" ? activeClass : defaultClass,
            })}
          >
            <Link href="/team">Team</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Contact */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle({
              className: pathname === "/contact" ? activeClass : defaultClass,
            })}
          >
            <Link href="/contact">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
