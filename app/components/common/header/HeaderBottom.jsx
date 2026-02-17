import { ProfileDropdown } from "@/app/components/pages/profile/ProfileDropdown";
import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";
import CartIcon from "../CartIcon";
import FillButton from "../FillButton";
import MainMenu from "./NavigationMenuDemo";

export default function HeaderBottom() {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated, user } = useAuthContext();
  const { setIsCartOpen, cartData } = useCart();
  console.log(cartData);

  const handleAddTicket = (ticket) => {
    setCartItems([...cartItems, ticket]);
  };

  const handleRemoveTicket = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  return (
    <>
      <div className=" flex items-center justify-between">
        {/* Navigation Items */}
        <MainMenu />

        {/* Add to cart and search  */}
        {isAuthenticated && (
          <div className=" flex gap-7">
            <div onClick={() => setIsCartOpen(true)}>
              <CartIcon count={cartData?.items?.length} />
            </div>
            {/* <SearchInput /> */}
          </div>
        )}

        {/* Button Group */}
        <div className=" flex gap-5">
          {!isAuthenticated ? (
            <>
              {/* <Link href="/member-register">
                <BorderButton>Become a Member</BorderButton>
              </Link> */}
              <Link href="/accounts/login">
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
