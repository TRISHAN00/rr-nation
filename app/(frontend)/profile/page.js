"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import UserProfileTabs from "@/app/components/tabs/UserProfileTabs";
import { getProfileData } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  const [fetching, setFetching] = useState(true);

  /* -------- FETCH PROFILE DATA -------- */
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await getProfileData();
        setUser(res);
      } catch (err) {
        console.error("Failed to load profile");
      } finally {
        setFetching(false);
      }
    }

    fetchProfile();
  }, []);

  return (
    <>
      <InnerBanner
        title="Profile"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Profile" }]}
      />

      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
        <div className="container m-auto">
          <UserProfileTabs user={user} />
        </div>
      </div>
    </>
  );
}
