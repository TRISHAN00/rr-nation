"use client";
import InnerBanner from "@/app/components/common/InnerBanner";
import { UserProfileTabs } from "@/app/components/tabs/UserProfileTabs";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <>
      <InnerBanner
        title="Profile"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Profile" }]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className=" container m-auto">
          {/* Profile Header Card */}

          <UserProfileTabs />
        </div>
      </div>
    </>
  );
}
