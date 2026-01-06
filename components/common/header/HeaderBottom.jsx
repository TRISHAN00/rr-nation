import Link from "next/link";
import BorderButton from "../BorderButton";
import CartIcon from "../CartIcon";
import FillButton from "../FillButton";
import SearchInput from "./SearchInput";

export default function HeaderBottom() {
  return (
    <div className=" flex items-center justify-between mt-5">
      <nav>
        <ul className=" flex text-white gap-7">
          <li>
            <Link href="#">Home</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            <Link href="#">Event</Link>
          </li>
          <li>
            <Link href="#">Blog</Link>
          </li>
          <li>
            <Link href="#">Gallery</Link>
          </li>
          <li>
            <Link href="#">Team</Link>
          </li>
          <li>
            <Link href="#">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className=" flex gap-7">
        <CartIcon count={12} />
        <SearchInput/>
      </div>

      <div className=" flex gap-5">
        <BorderButton>Become a Member</BorderButton>
        <FillButton>Login</FillButton>
      </div>
    </div>
  );
}
