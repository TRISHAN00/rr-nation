import Image from "next/image";

export default function Partner({ src }) {
  console.log(src)
  return (
    <div className="w-32 h-22 flex items-center justify-center">
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
