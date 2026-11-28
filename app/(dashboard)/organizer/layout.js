"use client";

import { ThemeProvider } from "@/app/(admin)/dashboard/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { getMyOrganizerRegistration } from "@/services/organizer.service";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { HeaderOrg } from "./_components/HeaderOrg";
import { SidebarOrg } from "./_components/SidebarOrg";
import OrganizerEventProvider from "./context/OrganizerEventContext";

const OrganizerDashboardLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [approved, setApproved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    getMyOrganizerRegistration()
      .then((res) => {
        if (!active) return;
        const status = String(res?.data?.adminApproval || "").toLowerCase();
        const ok = status === "approved";
        setApproved(ok);
        if (!ok) router.replace("/organizer-register?status=" + encodeURIComponent(status || "pending"));
      })
      .catch(() => {
        if (!active) return;
        router.replace("/organizer-register");
      })
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [router]);

  if (checking) {
    return (
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen flex items-center justify-center bg-background">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </AuthProvider>
      </ThemeProvider>
    );
  }

  if (!approved) return null;

  return (
    <ThemeProvider>
      <AuthProvider>
        <OrganizerEventProvider>
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
        </OrganizerEventProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
export default OrganizerDashboardLayout;
