import Image from "next/image";

export default function RunIcon({icon}) {
  return (
    <Image
      src={icon}
      height={20}
      width={20}
      alt="runrise run"
    />
  );
}
