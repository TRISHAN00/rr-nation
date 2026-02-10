"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import { UserProfileTabs } from "@/app/components/tabs/UserProfileTabs";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const isAuthenticated = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) setUserData(JSON.parse(data));
  }, []);

  if (isAuthenticated === null) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return null; // middleware will redirect
  }

  return (
    <>
      <InnerBanner
        title="Profile"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Profile" },
        ]}
      />

      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
        <div className="container m-auto">
          {userData && <UserProfileTabs />}
        </div>
      </div>
    </>
  );
}
