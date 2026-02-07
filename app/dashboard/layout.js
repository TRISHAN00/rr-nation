"use client"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DashboardHeader } from "./_components/DashboardHeader";
import { DashboardSidebar } from "./_components/DashboardSidebar";
import { ThemeProvider } from "./context/ThemeContext";

const DashboardLayout = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className={cn(
          "flex flex-col transition-all duration-300",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <DashboardHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
    </ThemeProvider>
  );
};
export default DashboardLayout;
