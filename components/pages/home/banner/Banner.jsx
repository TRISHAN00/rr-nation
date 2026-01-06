import Image from "next/image";
import Overlay from "./Overlay";

export default function Banner() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/dynamic/home/banner/banner.jpg"
        alt="Hero Image"
        className="w-full h-full object-cover"
        fill
      />

      {/* Gradient Overlay */}
      <Overlay />

      {/* Content on top */}
      <div className="absolute inset-0 z-10 flex items-end p-6">
        {/* Follow Us */}
        {/* Banner CTA */}
        {/* Banner Slide Arrow */}
      </div>
    </div>
  );
}
