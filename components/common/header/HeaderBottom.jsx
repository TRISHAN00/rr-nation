import BorderButton from "../BorderButton";
import CartIcon from "../CartIcon";
import FillButton from "../FillButton";
import NavItems from "./NavItems";
import SearchInput from "./SearchInput";

export default function HeaderBottom() {
  return (
    <div className=" flex items-center justify-between">
      {/* Navigation Items */}
      <NavItems />

      {/* Add to cart and search  */}
      <div className=" flex gap-7">
        <CartIcon count={12} />
        <SearchInput />
      </div>

      {/* Button Group */}
      <div className=" flex gap-5">
        <BorderButton>Become a Member</BorderButton>
        <FillButton>Login</FillButton>
      </div>
    </div>
  );
}
