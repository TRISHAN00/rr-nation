"use client";

import { ProfileDropdown } from "@/app/components/pages/profile/ProfileDropdown";
import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 1. Import usePathname
import CartIcon from "../CartIcon";
import FillButton from "../FillButton";
import MainMenu from "./NavigationMenuDemo";

export default function HeaderBottom() {
  const { isAuthenticated, user } = useAuthContext();
  const { setIsCartOpen, cartData } = useCart();
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between">
        <MainMenu />

        <div className="flex gap-7">
          <div onClick={() => setIsCartOpen(true)} className="cursor-pointer">
            <CartIcon
              count={cartData?.items?.length || 0}
              isAuthenticated={isAuthenticated}
              cartData={cartData}
            />
          </div>
        </div>

        <div className="flex gap-5">
          {!isAuthenticated ? (
            <>
              {/* 3. Pass current pathname as a redirect query */}
              <Link href={`/accounts/login?redirect=${pathname}`}>
                <FillButton>Login</FillButton>
              </Link>
            </>
          ) : (
            <ProfileDropdown user={user} />
          )}
        </div>
      </div>
    
    </>
  );
}