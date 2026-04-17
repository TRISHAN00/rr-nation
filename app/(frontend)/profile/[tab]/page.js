"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import UserProfileTabs from "@/app/components/tabs/UserProfileTabs";
import { getMemberRegInfo } from "@/services/member.service";
import { getProfileData } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [memberInfo, setMemberInfo] = useState({})
  const [loading, setLoading] = useState(true);

    console.log(user)

  /* -------- FETCH PROFILE DATA -------- */
  async function fetchProfile() {
    try {
      const res = await getProfileData();
      setUser(res);
    } catch (err) {
      console.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  async function fetchMemberRegistration() {
    try {
      const res = await getMemberRegInfo();
      setMemberInfo(res)
    } catch (err) {
      console.error(`Failed to load member registration data`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile();
    fetchMemberRegistration();
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
          <UserProfileTabs user={user} memberInfo={memberInfo} />
        </div>
      </div>
    </>
  );
}
