import Title from "@/app/components/common/Title";
import ServiceCard from "./ServiceCard";

const services = [
  {
    id: 1,
    title: "Event Management",
    desc: "From route planning to race-day execution, we deliver world-class athletic events that inspire and engage the community.",
    image: "/dynamic/service/Service_Event Management.jpg",
  },
  {
    id: 2,
    title: "Merchandising",
    desc: "We design and produce premium, performance-ready athletic gear and high-quality finisher collectibles for every milestone.",
    image: "/dynamic/service/Service_Merchandising.png",
  },
  {
    id: 3,
    title: "MVendor Managementg",
    desc: "We bridge the gap between events and top-tier suppliers, handling logistics, hydration, and technical support for a seamless experience.",
    image: "/dynamic/service/Service_MultiVendor.png",
  },
];

export default function Services() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-7.5 py-14 sm:py-20 lg:py-30">
      <Title label="Service" title="Explore Our Service" hideBtnArrow hideSearch />

      <div className=" grid gap-5 sm:gap-6 lg:gap-7.5 mt-8 sm:mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {services?.map((service) => (
          <ServiceCard service={service} />
        ))}
      </div>
    </section>
  );
}
