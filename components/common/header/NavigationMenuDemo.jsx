"use client";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
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

        {/* Event Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`${
              pathname.startsWith("/event") ? activeClass : defaultClass
            }`}
          >
            Event
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-48 space-y-2 p-3 bg-gray-800 rounded-md shadow-lg">
              {["event-one", "event-two"].map((event) => (
                <li key={event}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/event/${event}`}
                      className={`block px-4 py-2 rounded-md text-sm transition ${
                        pathname === `/event/${event}`
                          ? "text-teal-400 bg-gray-700"
                          : "text-gray-200 hover:text-teal-400 hover:bg-gray-700"
                      }`}
                    >
                      {event.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
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
