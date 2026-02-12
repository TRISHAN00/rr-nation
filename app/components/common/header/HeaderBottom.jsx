
import { ProfileDropdown } from "@/app/components/pages/profile/ProfileDropdown";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import BorderButton from "../BorderButton";
import CartIcon from "../CartIcon";
import FillButton from "../FillButton";
import MainMenu from "./NavigationMenuDemo";
import SearchInput from "./SearchInput";

export default function HeaderBottom() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const { isAuthenticated, loading } = useAuthContext();

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
        <div className=" flex gap-7">
          <div onClick={() => setCartOpen(true)}>
            <CartIcon count={12} />
          </div>
          <SearchInput />
        </div>

        {/* Button Group */}
        <div className=" flex gap-5">
          {!isAuthenticated ? (
            <>
              <Link href="/member-register">
                <BorderButton>Become a Member</BorderButton>
              </Link>
              <Link href="/login">
                <FillButton>Login</FillButton>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>
      </div>
    </>
  );
}
