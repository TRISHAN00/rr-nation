"use client";

import { ProfileDropdown } from "@/app/components/pages/profile/ProfileDropdown";
import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { getGlobalData } from "@/services/global.service";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartIcon from "../CartIcon";
import FillButton from "../FillButton";
import MainMenu from "./NavigationMenuDemo";

export default function HeaderBottom() {
  const { isAuthenticated, user } = useAuthContext();
  const { setIsCartOpen, cartData } = useCart();
  const pathname = usePathname();
  const [global, setGlobal] = useState({});

  const fetchGlobal = async () => {
    try {
      const res = await getGlobalData();
      setGlobal(res?.data?.data || {});
    } catch (err) {
      console.error("Failed to load global data", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchGlobal();
  }, [isAuthenticated]);

  const showMemberButton = isAuthenticated ? !global?.isMember : true;

  return (
    <>
      <div className="flex items-center justify-between">
        <MainMenu isMember={global?.isMember} />

        <div className="flex gap-7">
          <div onClick={() => setIsCartOpen(true)} className="cursor-pointer">
            <CartIcon
              count={cartData?.items?.length || 0}
              isAuthenticated={isAuthenticated}
              cartData={cartData}
            />
          </div>
        </div>

        <div className="flex gap-3">
          {!isAuthenticated ? (
            <>
              <Link href={`/accounts/login?redirect=${pathname}`}>
                <FillButton>Login</FillButton>
              </Link>
            </>
          ) : (
            <>
              <ProfileDropdown user={user} />
            </>
          )}
        </div>
      </div>
    
    </>
  );
}
