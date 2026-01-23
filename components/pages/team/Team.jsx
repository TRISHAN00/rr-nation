import RelatedSlide from "@/components/common/RelatedSlide";
import TeamCard from "./TeamCard";

export default function Team() {
  return (
    <section>
      <div className=" container m-auto px-7.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6">
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <RelatedSlide/>
        </div>
      </div>
    </section>
  );
}
