"use client";
import { AuthProvider } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DashboardHeader } from "../(admin)/dashboard/_components/DashboardHeader";
import { CouponProvider } from "../(admin)/dashboard/context/CouponContext";
import EventProvider from "../(admin)/dashboard/context/EventContext";
import { ThemeProvider } from "../(admin)/dashboard/context/ThemeContext";
import { SidebarOrg } from "./organizer/_components/SidebarOrg";

const DashboardLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <EventProvider>
            <CouponProvider>
              <div className="min-h-screen bg-background">
                <SidebarOrg
                  collapsed={sidebarCollapsed}
                  onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
                <div
                  className={cn(
                    "flex flex-col transition-all duration-300",
                    sidebarCollapsed ? "ml-16" : "ml-64",
                  )}
                >
                  <DashboardHeader />
                  <main className="flex-1 p-6">{children}</main>
                </div>
              </div>
            </CouponProvider>
        </EventProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
export default DashboardLayout;
