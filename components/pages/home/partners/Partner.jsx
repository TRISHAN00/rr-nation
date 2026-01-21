import Image from "next/image";

export default function Partner({ src }) {
  return (
    <div className="w-[130px] h-[90px] flex items-center justify-center">
      <Image
        src={src}
        width={130}
        height={90}
        alt="partner logo"
        className="object-contain"
      />
    </div>
  );
}
