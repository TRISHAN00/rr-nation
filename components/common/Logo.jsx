import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex w-fit">
      <Image
        src="/rr-nation-logo.svg"
        width={100}
        height={97}
        alt="Run Rise Nation"
        priority
      />
    </Link>
  );
}
