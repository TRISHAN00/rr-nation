"use client";

import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Image,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Trophy,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Events", icon: Calendar, path: "/events" },
  { title: "Registrations", icon: UserCheck, path: "/registrations" },
  { title: "Services", icon: Briefcase, path: "/services" },
  { title: "Blog Posts", icon: FileText, path: "/blog" },
  { title: "Team", icon: Users, path: "/team" },
  { title: "Gallery", icon: Image, path: "/gallery" },
  { title: "Testimonials", icon: MessageSquare, path: "/testimonials" },
  { title: "Payments", icon: CreditCard, path: "/payments" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export function DashboardSidebar({ collapsed, onToggle }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
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
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <Trophy className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar hover:bg-sidebar-accent"
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
