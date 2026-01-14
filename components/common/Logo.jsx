import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center w-fit shrink-0"
      aria-label="Run Rise Nation Home"
    >
      <Image
        src="/rr-nation-logo.svg"
        alt="Run Rise Nation"
        priority
        className={clsx("w-[70px] h-auto sm:w-[80px] md:w-[90px] xl:w-[100px]")}
        width={100}
        height={97}
      />
    </Link>
  );
}
