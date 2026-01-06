import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image
        src={"/rr-nation-logo.svg"}
        width={100}
        height={97}
        alt="Run Rise Nation"
      />
    </Link>
  );
}
