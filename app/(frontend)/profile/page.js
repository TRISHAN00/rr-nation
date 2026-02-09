"use client";
import InnerBanner from "@/app/components/common/InnerBanner";
import { UserProfileTabs } from "@/app/components/tabs/UserProfileTabs";
import useAuth from "@/hooks/useAuth";

export default function ProfilePage() {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <p>Checking authentication...</p>; // optional loading state
  }

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  console.log(userData);

  return (
    <>
      <InnerBanner
        title="Profile"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Profile" }]}
      />
      
      

      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
        <div className=" container m-auto">
          {/* Profile Header Card */}

          <UserProfileTabs />
        </div>
      </div>
    </>
  );
}
