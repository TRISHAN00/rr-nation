import Logo from "../Logo";
import HeaderBottom from "./HeaderBottom";
import HeaderTop from "./HeaderTop";


export default function Header() {
  return (
    <div className=" absolute max-w-7xl flex px-[30px] gap-x-24 m-auto left-0 right-0 w-full top-[30px] z-15">
      <Logo />
      <div className=" w-full">
        <HeaderTop />
        <HeaderBottom />
      </div>
    </div>
  );
}
