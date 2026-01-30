import AuthModal from "@/components/auth/AuthModal";
import Link from "next/link";
import BorderButton from "../BorderButton";
import CartIcon from "../CartIcon";
import MainMenu from "./NavigationMenuDemo";
import SearchInput from "./SearchInput";

export default function HeaderBottom() {
  return (
    <div className=" flex items-center justify-between">
      {/* Navigation Items */}
      <MainMenu />

      {/* Add to cart and search  */}
      <div className=" flex gap-7">
        <CartIcon count={12} />
        <SearchInput />
      </div>

      {/* Button Group */}
      <div className=" flex gap-5">
        <Link href={"member-register"}>
          <BorderButton>Become a Member</BorderButton>
        </Link>
        <AuthModal />
      </div>
    </div>
  );
}
