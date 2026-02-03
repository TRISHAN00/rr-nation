import Title from "@/app/components/common/Title";
import TeamFilter from "./TeamFilter";

export default function Team() {
  return (
    <section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5 py-14 sm:py-20 lg:py-30">
        <Title
          label="TEAM"
          title="Meet Our Dedicated Members"
          hideBtnArrow
          searchPlaceholder="Search team..."
        />
        <TeamFilter/>
      </div>
    </section>
  );
}
