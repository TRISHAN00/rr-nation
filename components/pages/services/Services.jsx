import Title from "@/components/common/Title";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-7.5 py-14 sm:py-20 lg:py-30">
      <Title label="Service" title="Explore Our Service" hideBtnArrow />

      <div className=" grid gap-5 sm:gap-6 lg:gap-7.5 mt-8 sm:mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
    </section>
  );
}
