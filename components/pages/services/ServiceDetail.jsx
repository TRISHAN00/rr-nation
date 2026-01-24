import RelatedSlide from "@/components/common/RelatedSlide";
import UsefulLinks from "@/components/common/UsefulLinks";
import Image from "next/image";
import CallUsCard from "./CallUsCard";
import ServiceContent from "./ServiceContent";

export default function ServiceDetail() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-7.5 py-14 sm:py-20 lg:py-30">
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Content */}
        <div className="lg:col-span-8">
          {/* Banner */}
          <div className="rounded-3xl overflow-hidden relative">
            <Image
              src="/dynamic/event/event-banner.jpg"
              alt="run rise banner"
              height={610}
              width={1170}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <div className=" mt-10" >
            <ServiceContent />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24 space-y-6">
            <CallUsCard />
            <UsefulLinks />
            <RelatedSlide />
          </div>
        </div>
      </div>
    </section>
  );
}
