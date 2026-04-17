"use client";

import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import { Briefcase, Calendar, ChevronDown, ChevronLeft, ChevronRight, CreditCard, FileText, Image, LayoutDashboard, MessageSquare, Settings, Trophy, User, UserCheck, Users, } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Users", icon: User, path: "/dashboard/users" },

    {
        title: "Members",
        icon: User,
        path: "/dashboard/members",
        children: [
          
            {
                title: "Coupons",
                path: "/dashboard/members/coupons",
            },
        ],
    },

    { title: "Events", icon: Calendar, path: "/dashboard/events" },
    { title: "Registrations", icon: UserCheck, path: "/dashboard/registrations" },
    { title: "Services", icon: Briefcase, path: "/dashboard/services" },
    { title: "Blog Posts", icon: FileText, path: "/dashboard/blog" },
    { title: "Team", icon: Users, path: "/dashboard/team" },
    { title: "Gallery", icon: Image, path: "/dashboard/gallery" },
    { title: "Testimonial", icon: MessageSquare, path: "/dashboard/testimonial" },
    { title: "Payments", icon: CreditCard, path: "/dashboard/payments" },
    { title: "Settings", icon: Settings, path: "/dashboard/settings" },
];

export function DashboardSidebar({ collapsed, onToggle }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand">
              <Trophy className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <span className="block text-sm font-bold text-sidebar-foreground">
                Run Rise
              </span>
              <span className="text-xs text-sidebar-muted">Dashboard</span>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-brand">
            <Trophy className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const hasChildren = item.children?.length > 0;
          const isOpen = openMenu === item.title;

          return (
            <div key={item.title}>
              {/* Parent Item */}
              <div
                onClick={() =>
                  hasChildren
                    ? setOpenMenu(isOpen ? null : item.title)
                    : null
                }
                className={cn(
                  "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium cursor-pointer transition-all",
                  isActive
                    ? "bg-brand text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                  collapsed && "justify-center px-2"
                )}
              >
                <Link
                  href={item.path}
                  className="flex items-center gap-3 w-full"
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>

                {!collapsed && hasChildren && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                )}
              </div>

              {/* Submenu */}
              {hasChildren && isOpen && !collapsed && (
                <div className="ml-8 mt-1 flex flex-col gap-1">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.path;

                    return (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm transition-all",
                          isChildActive
                            ? "bg-brand text-white"
                            : "text-sidebar-muted hover:bg-sidebar-accent"
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

      {/* Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar"
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