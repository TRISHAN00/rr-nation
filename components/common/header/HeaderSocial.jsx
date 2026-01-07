import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function HeaderSocial({ direction }) {
  return (
    <ul className={`flex ${direction === "column" ? "flex-col" : "flex"} items-center gap-3`}>
      <li>
        <Link href="#">
          <Facebook color="#fff" size={18} fill="#fff" strokeWidth="0" />
        </Link>
      </li>
      <li>
        <Link href="#">
          <Instagram color="#fff" size={18} />
        </Link>
      </li>
      <li>
        <Link href="#">
          <Twitter color="#fff" size={18} fill="#fff" strokeWidth="0" />
        </Link>
      </li>
    </ul>
  );
}
