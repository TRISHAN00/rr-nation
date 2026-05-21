"use client";
import { ThemeProvider } from "@/app/(admin)/dashboard/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { HeaderOrg } from "./_components/HeaderOrg";
import { SidebarOrg } from "./_components/SidebarOrg";

const OrganizerDashboardLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
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
            <HeaderOrg />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};
export default OrganizerDashboardLayout;
