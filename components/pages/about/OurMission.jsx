import AwardWin from "./AwardWin";
import MissionItem from "./MissionItem";

export default function OurMission() {
  return (
    <section
      className="
        bg-cover bg-no-repeat bg-center
        py-16 sm:py-24 xl:py-36
      "
      style={{
        backgroundImage: "url('/static/bg-about.jpg')",
      }}
    >
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-[30px]
          grid grid-cols-1
          lg:grid-cols-2
          gap-10 xl:gap-16
          items-center
        "
      >
        {/* Left Image Section */}
        <AwardWin />

        {/* Right Content */}
        <MissionItem />
      </div>
    </section>
  );
}
