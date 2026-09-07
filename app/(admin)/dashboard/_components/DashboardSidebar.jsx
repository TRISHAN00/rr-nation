"use client";

import Logo from "@/app/components/common/Logo";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Box,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ShoppingBag,
  Tags,
  Trophy,
  Truck,
  User,
  UserCheck
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Users", icon: User, path: "/dashboard/users" },
  {
    title: "Members",
    icon: User,
    children: [
      {
        title: "Member List",
        path: "/dashboard/members",
      },
      {
        title: "Coupons",
        path: "/dashboard/members/coupons",
      },
    ],
  },
  {
    title: "Organizer",
    icon: Box,
    children: [
      {
        title: "List",
        path: "/dashboard/organizer",
      },
    ],
  },
 
  { title: "Events", icon: Calendar, path: "/dashboard/events" },
  {
    title: "Shop",
    icon: ShoppingBag,
    children: [
      { title: "Products", path: "/dashboard/products" },
      { title: "Categories", path: "/dashboard/categories" },
      { title: "Delivery Options", path: "/dashboard/delivery-options" },
    ],
  },
  { title: "Registrations", icon: UserCheck, path: "/dashboard/registrations" },
];

export function DashboardSidebar({ collapsed, onToggle }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);

  // Auto-open parent menu if a child path is active
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.children?.some((child) => child.path === pathname)) {
        setOpenMenu(item.title);
      }
    });
  }, [pathname]);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex h-auto py-2 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <Logo/>
          </div>
        ) : (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-brand">
            <Trophy className="h-5 w-5 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3 overflow-y-auto h-[calc(100vh-64px)] scrollbar-hide">
        {menuItems?.map((item) => {
          const hasChildren = item.children?.length > 0;
          const isActive = pathname === item.path || (hasChildren && item.children.some(c => c.path === pathname));
          const isOpen = openMenu === item.title;

          return (
            <div key={item.title} className="w-full">
              {/* Parent Item */}
              <div
                onClick={() => {
                  if (hasChildren && !collapsed) {
                    setOpenMenu(isOpen ? null : item.title);
                  }
                }}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all group",
                  isActive && !hasChildren
                    ? "bg-brand text-white"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                  collapsed && "justify-center px-2"
                )}
              >
                {/* Wrap content in Link if no children, otherwise use a div to toggle */}
                {!hasChildren ? (
                  <Link href={item.path || "#"} className="flex items-center gap-3 w-full">
                    <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-white")} />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-brand")} />
                      {!collapsed && <span>{item.title}</span>}
                    </div>
                    {!collapsed && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform text-sidebar-muted",
                          isOpen && "rotate-180"
                        )}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Submenu Rendering */}
              {hasChildren && isOpen && !collapsed && (
                <div className="ml-9 mt-1 flex flex-col gap-1 border-l border-sidebar-border pl-2">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.path;

                    return (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={cn(
                          "rounded-md px-3 py-1.5 text-xs transition-all",
                          isChildActive
                            ? "bg-brand/10 text-brand font-semibold"
                            : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent"
                        )}
                      >
                        {child.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar shadow-sm hover:bg-sidebar-accent"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </aside>
  );
}